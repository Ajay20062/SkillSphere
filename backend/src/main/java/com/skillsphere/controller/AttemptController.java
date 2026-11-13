package com.skillsphere.controller;

import com.skillsphere.dto.AttemptRequest;
import com.skillsphere.model.Attempt;
import com.skillsphere.service.AttemptService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AttemptController {
    private final AttemptService service;
    public AttemptController(AttemptService service) { this.service = service; }

    @PostMapping("/attempts")
    public Map<String, Object> submit(@Valid @RequestBody AttemptRequest request) {
        return service.submit(request);
    }

    @GetMapping("/attempts/user/{userId}")
    public List<Attempt> history(@PathVariable Long userId) {
        return service.history(userId);
    }

    @GetMapping("/leaderboard")
    public List<Attempt> leaderboard() { return service.leaderboard(); }
}
