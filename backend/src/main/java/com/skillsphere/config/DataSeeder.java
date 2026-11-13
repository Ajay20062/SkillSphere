package com.skillsphere.config;

import com.skillsphere.model.*;
import com.skillsphere.repository.QuizRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedQuizzes(QuizRepository quizzes) {
        return args -> {
            if (quizzes.count() > 0) return;

            Quiz web = new Quiz("Web Development Basics", "Frontend",
                    "Test your HTML, CSS and JavaScript fundamentals.", 10);
            web.addQuestion(new Question("Which HTML element is used for the largest heading?",
                    "<h6>", "<heading>", "<h1>", "<head>", "C"));
            web.addQuestion(new Question("Which CSS property changes text color?",
                    "font-style", "color", "background", "text-size", "B"));
            web.addQuestion(new Question("Which keyword declares a block-scoped variable?",
                    "var", "define", "let", "dim", "C"));
            quizzes.save(web);

            Quiz java = new Quiz("Java & Spring Fundamentals", "Backend",
                    "Check your understanding of Java and Spring Boot.", 10);
            java.addQuestion(new Question("Which keyword is used to inherit a class in Java?",
                    "implements", "extends", "inherits", "super", "B"));
            java.addQuestion(new Question("Which annotation marks a Spring REST controller?",
                    "@RestController", "@Entity", "@Repository", "@Autowired", "A"));
            java.addQuestion(new Question("Which interface is commonly used for JPA repositories?",
                    "List", "Runnable", "JpaRepository", "Serializable", "C"));
            quizzes.save(java);

            Quiz sql = new Quiz("SQL Essentials", "Database",
                    "Practice basic SQL and relational database concepts.", 8);
            sql.addQuestion(new Question("Which SQL command retrieves data?",
                    "GET", "SELECT", "FETCH TABLE", "OPEN", "B"));
            sql.addQuestion(new Question("Which clause filters grouped records?",
                    "WHERE", "ORDER BY", "HAVING", "LIMIT", "C"));
            sql.addQuestion(new Question("Which join returns matching rows from both tables?",
                    "INNER JOIN", "CROSS JOIN", "FULL OUTER JOIN", "SELF JOIN", "A"));
            quizzes.save(sql);
        };
    }
}
