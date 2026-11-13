package com.skillsphere.controller;

import com.skillsphere.model.Quiz;
import com.skillsphere.service.QuizService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    private final QuizService service;
    public QuizController(QuizService service) { this.service = service; }

    @GetMapping
    public List<Quiz> all() { return service.all(); }

    @GetMapping("/{id}")
    public Quiz get(@PathVariable Long id) { return service.get(id); }
}
