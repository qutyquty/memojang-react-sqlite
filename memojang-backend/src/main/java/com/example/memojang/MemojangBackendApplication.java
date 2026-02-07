package com.example.memojang;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.memojang.mapper")
public class MemojangBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MemojangBackendApplication.class, args);
	}

}
