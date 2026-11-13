package com.skillsphere.dto;

public class AnswerRequest {
    private Long questionId;
    private String selectedOption;
    public Long getQuestionId() { return questionId; }
    public String getSelectedOption() { return selectedOption; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }
    public void setSelectedOption(String selectedOption) { this.selectedOption = selectedOption; }
}
