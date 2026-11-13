package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Attempt {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String studentName;
    private Long quizId;
    private String quizTitle;
    private int score;
    private int totalQuestions;
    private LocalDateTime attemptedAt;

    @PrePersist
    public void beforeSave() { if (attemptedAt == null) attemptedAt = LocalDateTime.now(); }

    public Attempt() {}
    public Attempt(Long userId, String studentName, Long quizId, String quizTitle,
                   int score, int totalQuestions) {
        this.userId = userId; this.studentName = studentName; this.quizId = quizId;
        this.quizTitle = quizTitle; this.score = score; this.totalQuestions = totalQuestions;
    }
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getStudentName() { return studentName; }
    public Long getQuizId() { return quizId; }
    public String getQuizTitle() { return quizTitle; }
    public int getScore() { return score; }
    public int getTotalQuestions() { return totalQuestions; }
    public LocalDateTime getAttemptedAt() { return attemptedAt; }
}
