package com.example.memojang.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.memojang.dto.NoteDto;
import com.example.memojang.service.NoteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notes")
@Tag(name = "Memojang API", description = "Memojang CRUD API")
public class NoteController {
	
	private final NoteService noteService;
	
	@GetMapping
	public List<NoteDto> getNotesByMonth(
			@RequestParam("year") int year,
			@RequestParam("month") int month) {
		return noteService.findByYearMonth(year, month);		
	}
	
	@Operation(summary = "단건 조회", description = "id로 단건 조회합니다.")
	@GetMapping("/{id}")
	public ResponseEntity<NoteDto> getById(@PathVariable("id") Long id) {
		NoteDto note = noteService.getById(id);
		return ResponseEntity.ok(note);
	}
	
	@PostMapping
	public ResponseEntity<NoteDto> create(@RequestBody NoteDto note) {
		NoteDto created = noteService.create(note);
		return ResponseEntity.ok(created);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<NoteDto> update(@PathVariable("id") Long id, @RequestBody NoteDto dto) {
		NoteDto updated = noteService.update(id, dto);
		return ResponseEntity.ok(updated);
	}
	
	@PatchMapping("/{id}/completed")
	public ResponseEntity<NoteDto> updateCompleted(
			@PathVariable("id") Long id, 
			@RequestParam("completed") boolean completed) {
		NoteDto updateCompleted = noteService.updateCompleted(id, completed);
		return ResponseEntity.ok(updateCompleted);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNote(@PathVariable("id") Long id) {
		noteService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
