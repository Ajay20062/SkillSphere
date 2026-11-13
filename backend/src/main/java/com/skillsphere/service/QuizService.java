package com.skillsphere.service;

import com.skillsphere.model.Quiz;
import com.skillsphere.repository.QuizRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class QuizService {
    private final QuizRepository quizzes;
    public QuizService(QuizRepository quizzes) { this.quizzes = quizzes; }

    public List<Quiz> all() { return quizzes.findAll(); }

    @Transactional(readOnly = true)
    public Quiz get(Long id) {
        Quiz quiz = quizzes.findById(id).orElseThrow(() -> new IllegalArgumentException("Quiz not found."));
        quiz.getQuestions().size();
        return quiz;
    }
}
