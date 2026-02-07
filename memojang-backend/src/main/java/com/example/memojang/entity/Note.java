package com.example.memojang.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Note {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	
	private String title;
	
	private String content;
	
	@Column(name = "event_date", nullable = false)
	private LocalDate eventDate;
	
	@Column(nullable = false)
	private boolean completed = false;

}
