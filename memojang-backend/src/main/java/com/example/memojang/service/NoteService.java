package com.example.memojang.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.memojang.dto.NoteDto;
import com.example.memojang.entity.Note;
import com.example.memojang.mapper.NoteMapper;
import com.example.memojang.repository.NoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoteService {
	
	private final NoteRepository noteRepository;
	
	public List<NoteDto> getAll() {
		return noteRepository.findAll().stream()
				.map(NoteMapper::toDto)
				.collect(Collectors.toList());
	}
	
	public List<NoteDto> findByYearMonth(int year, int month) {
		LocalDate start = LocalDate.of(year,  month, 1);
		LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
		
		List<Note> notes = noteRepository.findByEventDateBetween(start, end);
		return notes.stream()
				.map(NoteMapper::toDto)
				.toList();
	}
	
	public NoteDto getById(Long id) {
		return noteRepository.findById(id)
				.map(NoteMapper::toDto)
				.orElseThrow(() -> new RuntimeException("Note not found"));
	}
	
	public NoteDto create(NoteDto dto) {
		Note note = NoteMapper.toEntity(dto);
		Note saved = noteRepository.save(note);
		return NoteMapper.toDto(saved);
	}
	
	public NoteDto update(Long id, NoteDto dto) {
		Note note = noteRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Note not found"));
		note.setTitle(dto.getTitle());
		note.setContent(dto.getContent());
		return NoteMapper.toDto(noteRepository.save(note));
	}
	
	public NoteDto updateCompleted(Long id, Boolean completed) {
		Note note = noteRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Note not found"));
		note.setCompleted(completed);
		Note saved = noteRepository.save(note);
		return NoteMapper.toDto(saved);
	}
	
	public void delete(Long id) {
		noteRepository.deleteById(id);
	}

}
