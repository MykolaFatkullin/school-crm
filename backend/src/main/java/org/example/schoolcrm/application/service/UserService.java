package org.example.schoolcrm.application.service;

import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.common.exception.not_found.UserNotFoundException;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public UserEntity findById(UUID id) {
    return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  public UserEntity findByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  @Transactional
  public UserEntity save(UserEntity userEntity) {
    return userRepository.save(userEntity);
  }
}
