import { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";

import Calendar from "../components/Calendar";
import { createNote, deleteNote, getNotesByMonth, updateCompleted } from "../apis/noteApi";

const HomePage = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const notes = await getNotesByMonth(year, month);

        const grouped = notes.reduce((acc, note) => {
          const dateKey = note.eventDate;
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push({ id: note.id, title: note.title, content: note.content, completed: note.completed });
          return acc;
        }, {});

        setEvents(grouped);
      } catch (error) {
        console.error("이벤트 로드 실패: ", error);
      }
    };

    loadEvents();
  }, [year, month]);

  const handleRegister = async () => {
    if (selectedDate && title.trim() !== "") {
      const newEvent = { title, content, eventDate: selectedDate };

      try {
        const savedNote = await createNote(newEvent);

        // 로컬 상태에도 반영
        setEvents({ 
          ...events, 
          [selectedDate]: [...(events[selectedDate] || []), savedNote], 
        });

        setTitle("");
        setContent("");
        setShowModal(false);
      } catch (error) {
        console.error("Note 생성 에러: ", error);
      }
    }
  };

  const handleToggleCompleted = async (note, dateKey, checked) => {
    try {
      console.log("note: ", note);
      const updated = await updateCompleted(note.id, checked);
      console.log("updated: ", updated);

      // 상태 갱신
      setEvents((prev) => {
        const updatedEvents = { ...prev };
        updatedEvents[dateKey] = updatedEvents[dateKey].map((n) => 
          n.id === note.id ? updated : n
        );
        return updatedEvents;
      });
    } catch (error) {
      console.error("완료 상태 업데이트 실패: ", error);
    }
  };

  const handleDelete = async (note, dateKey) => {
    try {
      await deleteNote(note.id);

      setEvents((prev) => {
        const updatedEvents = { ...prev };
        updatedEvents[dateKey] = updatedEvents[dateKey].filter(
          (n) => n.id !== note.id
        );
        if (updatedEvents[dateKey].length === 0) {
          delete updatedEvents[dateKey];
        }
        return updatedEvents;
      });
    } catch (error) {
      console.error("삭제 실패: ", error);
    }
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col className="text-start">
          <h2>📅 달력 To Do App</h2>
        </Col>        

        {/* 버튼 영역 */}
        <Col className="text-end">
          <Button
            variant="success"
            disabled={!selectedDate}
            onClick={() => setShowModal(true)}
            className="me-2"
          >등록하기</Button>
          <Button variant="info" 
            disabled={!selectedDate || !events[selectedDate]?.length}
            onClick={() => setShowEventsModal(true)}
          >리스트 보기</Button>
        </Col>
      </Row>

      {/* 달력 컴포넌트 */}
      <Calendar
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={events}
      />

      {/* 메모 등록 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDate} 메모 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" rows={10}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Form.Group></Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>취소</Button>
          <Button variant="primary" onClick={handleRegister}>저장</Button>
        </Modal.Footer>
      </Modal>

      {/* 이벤트 보기 모달 */}
      <Modal show={showEventsModal} onHide={() => setShowEventsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDate} To Do List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {events[selectedDate]?.map((note) => (
            <div key={note.id} className="mb-3 border-bottom bp-2">
              <div className="d-flex align-items-center">
                <input type="checkbox" 
                  checked={note.completed ?? false}
                  onChange={(e) => 
                    handleToggleCompleted(note, selectedDate, e.target.checked)
                  } 
                />
                <strong className={
                    note.completed ? "text-decoration-line-through ms-2 text-success" : "ms-2 text-dark"
                  }
                >
                  {note.title}
                </strong>
              </div>              
              <p className="small text-muted" style={{ whiteSpace: "pre-line" }}>
                {note.content}
              </p>
              <div className="text-end">
                <button className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(note, selectedDate)}
                >삭제</button>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HomePage;