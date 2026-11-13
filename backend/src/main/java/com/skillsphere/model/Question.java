package com.skillsphere.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 1000)
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    @Column(nullable = false)
    @JsonIgnore
    private String correctOption;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    @JsonIgnore
    private Quiz quiz;

    public Question() {}
    public Question(String questionText, String optionA, String optionB,
                    String optionC, String optionD, String correctOption) {
        this.questionText = questionText; this.optionA = optionA; this.optionB = optionB;
        this.optionC = optionC; this.optionD = optionD; this.correctOption = correctOption;
    }
    public Long getId() { return id; }
    public String getQuestionText() { return questionText; }
    public String getOptionA() { return optionA; }
    public String getOptionB() { return optionB; }
    public String getOptionC() { return optionC; }
    public String getOptionD() { return optionD; }
    public String getCorrectOption() { return correctOption; }
    public Quiz getQuiz() { return quiz; }
    public void setId(Long id) { this.id = id; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public void setOptionA(String optionA) { this.optionA = optionA; }
    public void setOptionB(String optionB) { this.optionB = optionB; }
    public void setOptionC(String optionC) { this.optionC = optionC; }
    public void setOptionD(String optionD) { this.optionD = optionD; }
    public void setCorrectOption(String correctOption) { this.correctOption = correctOption; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
}
