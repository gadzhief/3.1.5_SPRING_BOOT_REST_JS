package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserDetailsServiceImpl;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminRestController {

    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public AdminRestController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostMapping()
    public ResponseEntity<Long> createUser(@RequestBody User user) {
        userDetailsService.saveUser(user);

        return new ResponseEntity<>(user.getId(), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userDetailsService.getUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userDetailsService.getUserById(id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable("id") Long id) {
        userDetailsService.deleteUser(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Long> editUser(@PathVariable("id") Long id,
                                         @RequestBody User user) {
        user.setId(id);
        userDetailsService.saveUser(user);

        return new ResponseEntity<>(user.getId(), HttpStatus.OK);
    }

    @GetMapping("/authentication")
    public ResponseEntity<Optional<User>> getUser(Principal principal) {
        Optional<User> user = userDetailsService.findByEmail(principal.getName());

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


}
