package org.example.schoolcrm.application.service;

import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.common.exception.UserNotFoundException;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserEntity findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
}
