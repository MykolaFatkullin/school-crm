package org.example.schoolcrm.infrastructure.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.schoolcrm.domain.MailType;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "email_verification_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailVerificationTokenEntity {

  @Id
  UUID token;

  @Column(name = "expiration_date", nullable = false)
  Instant expirationDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  MailType type;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  UserEntity user;
}
