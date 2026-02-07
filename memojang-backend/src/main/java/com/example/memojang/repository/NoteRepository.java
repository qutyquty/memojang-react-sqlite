package com.example.memojang.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.memojang.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
	
	List<Note> findByEventDateBetween(LocalDate start, LocalDate end);

}
