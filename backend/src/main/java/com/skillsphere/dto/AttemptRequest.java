package com.skillsphere.dto;

import java.util.List;

public class AttemptRequest {
    private Long userId;
    private Long quizId;
    private List<AnswerRequest> answers;
    public Long getUserId() { return userId; }
    public Long getQuizId() { return quizId; }
    public List<AnswerRequest> getAnswers() { return answers; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }
    public void setAnswers(List<AnswerRequest> answers) { this.answers = answers; }
}
