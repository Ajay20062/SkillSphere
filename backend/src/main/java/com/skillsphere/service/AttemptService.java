package com.skillsphere.service;

import com.skillsphere.dto.AnswerRequest;
import com.skillsphere.dto.AttemptRequest;
import com.skillsphere.model.*;
import com.skillsphere.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class AttemptService {
    private final AttemptRepository attempts;
    private final UserRepository users;
    private final QuizRepository quizzes;

    public AttemptService(AttemptRepository attempts, UserRepository users, QuizRepository quizzes) {
        this.attempts = attempts; this.users = users; this.quizzes = quizzes;
    }

    @Transactional
    public Map<String, Object> submit(AttemptRequest request) {
        AppUser user = users.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found."));
        Quiz quiz = quizzes.findById(request.getQuizId())
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found."));
        Map<Long, String> selected = new HashMap<>();
        if (request.getAnswers() != null) {
            for (AnswerRequest answer : request.getAnswers()) {
                if (answer.getQuestionId() != null)
                    selected.put(answer.getQuestionId(), answer.getSelectedOption());
            }
        }
        int score = 0;
        for (Question question : quiz.getQuestions()) {
            if (question.getCorrectOption().equalsIgnoreCase(
                    selected.getOrDefault(question.getId(), ""))) score++;
        }
        Attempt saved = attempts.save(new Attempt(user.getId(), user.getName(), quiz.getId(),
                quiz.getTitle(), score, quiz.getQuestions().size()));
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("attemptId", saved.getId());
        result.put("score", score);
        result.put("totalQuestions", quiz.getQuestions().size());
        result.put("percentage", quiz.getQuestions().isEmpty() ? 0 :
                Math.round(score * 100.0 / quiz.getQuestions().size()));
        result.put("message", "Quiz submitted successfully.");
        return result;
    }

    public List<Attempt> history(Long userId) {
        return attempts.findByUserIdOrderByAttemptedAtDesc(userId);
    }

    public List<Attempt> leaderboard() {
        return attempts.findTop20ByOrderByScoreDescAttemptedAtDesc();
    }
}
