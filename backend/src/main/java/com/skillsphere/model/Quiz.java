package com.skillsphere.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Quiz {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String category;
    private String description;
    private int durationMinutes = 10;
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Question> questions = new ArrayList<>();

    public Quiz() {}
    public Quiz(String title, String category, String description, int durationMinutes) {
        this.title = title; this.category = category; this.description = description;
        this.durationMinutes = durationMinutes;
    }
    public void addQuestion(Question question) {
        questions.add(question); question.setQuiz(this);
    }
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public int getDurationMinutes() { return durationMinutes; }
    public List<Question> getQuestions() { return questions; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }
}
