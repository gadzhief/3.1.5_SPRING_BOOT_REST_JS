package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserDetailsServiceImpl;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
public class UserRestController {

    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public UserRestController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/user")
    public ResponseEntity<Optional<User>> getUser(Principal principal) {
        Optional<User> user = userDetailsService.findByEmail(principal.getName());

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
