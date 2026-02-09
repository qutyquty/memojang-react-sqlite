import { Row, Col, Card, Form } from "react-bootstrap";

const Calendar = ({ year, setYear, month, setMonth, selectedDate, setSelectedDate, events }) => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  // 달력 데이터 생성
  let calendarCells = [
    ...Array.from({ length: firstDay > 0 ? firstDay : 0 }).map(() => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const remainder = calendarCells.length % 7;
  if (remainder !== 0) {
    calendarCells = [...calendarCells, ...Array.from({ length: 7 - remainder }).map(() => null)];
  }

  return (
    <>
      {/* 년/월 선택 */}
      <Row className="mb-3 justify-content-center">
        <Col xs="auto">
          <Form.Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* 요일 헤더 */}
      <Row className="text-center fw-bold mb-2">
        {weekDays.map((day) => (
          <Col key={day}>{day}</Col>
        ))}
      </Row>

      {/* 달력 */}
      {Array.from({ length: Math.ceil(calendarCells.length / 7) }, (_, weekIndex) => (
        <Row key={weekIndex} className="mb-3">
          {calendarCells.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, i) => {
            if (!day) return <Col key={`empty-${weekIndex}-${i}`} />;
            const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const weekDayIndex = new Date(year, month - 1, day).getDay();

            // 오늘 날짜 강조
            const isToday = date === todayString;

            // 해당 일자 이벤트에서 완료 이벤트 구하기
            const dayEvents = events[date] || [];
            const completedCount = dayEvents.filter(e => e.completed).length;

            return (
              <Col key={date}>
                <Card
                  bg={selectedDate === date ? "primary" : "light"}
                  text={selectedDate === date ? "white" : "dark"}
                  onClick={() => setSelectedDate(date)}
                  style={{
                    cursor: "pointer",
                    minHeight: "150px",
                    fontSize: "1.2rem",
                    border: isToday ? "2px solid red" : "1px solid #ccc", // ✅ 오늘 날짜 강조
                  }}
                >
                  <Card.Body>
                    {/* ✅ 일자만 카드 상단 왼쪽 */}
                    <div
                      style={{
                        fontWeight: "bold",
                        color: weekDayIndex === 0 ? "red" : "inherit", // ✅ 일요일은 빨간색
                      }}
                    >
                      {day}
                    </div>
                    {dayEvents.length > 0 && (
                      <div style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "5px", }}>
                        <span style={{ color: "green" }}>{completedCount}</span> 
                        {" / "}
                        <span style={{ color: "orange" }}>{dayEvents.length}</span>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ))}
    </>
  );
}

export default Calendar;
