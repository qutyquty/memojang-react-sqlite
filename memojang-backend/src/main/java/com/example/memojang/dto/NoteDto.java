package com.example.memojang.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NoteDto {
	
	private Long id;
	private String title;
	private String content;
	private String eventDate;
	private boolean completed;

}
