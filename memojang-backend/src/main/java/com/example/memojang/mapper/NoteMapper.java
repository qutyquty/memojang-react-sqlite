package com.example.memojang.mapper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.example.memojang.dto.NoteDto;
import com.example.memojang.entity.Note;

public class NoteMapper {
	
	public static NoteDto toDto(Note entity) {
		NoteDto dto = new NoteDto();
		dto.setId(entity.getId());
		dto.setTitle(entity.getTitle());
		dto.setContent(entity.getContent());
		if (entity.getEventDate() != null) {
			dto.setEventDate(entity.getEventDate().toString());
		}
		dto.setCompleted(entity.isCompleted());		
		return dto;
	}
	
	public static Note toEntity(NoteDto dto) {
		Note entity = new Note();
		entity.setTitle(dto.getTitle());
		entity.setContent(dto.getContent());
		if (dto.getEventDate() != null) {
			LocalDate eventDate = LocalDate.parse(
					dto.getEventDate(),
					DateTimeFormatter.ofPattern("yyyy-M-d")
			);
			entity.setEventDate(eventDate);
		}
		return entity;
	}

}
