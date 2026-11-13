package com.skillsphere.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class AttemptRequest {
    @NotNull(message = "User ID is required.")
    private Long userId;

    @NotNull(message = "Quiz ID is required.")
    private Long quizId;

    @Valid
    private List<AnswerRequest> answers;

    public Long getUserId() { return userId; }
    public Long getQuizId() { return quizId; }
    public List<AnswerRequest> getAnswers() { return answers; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }
    public void setAnswers(List<AnswerRequest> answers) { this.answers = answers; }
}
