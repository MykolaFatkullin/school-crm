package org.example.schoolcrm.infrastructure.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "school_smtp_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolSmtpSettingsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "smtp_host", nullable = false)
  private String smtpHost;

  @Column(name = "smtp_port", nullable = false)
  private Integer smtpPort;

  @Column(name = "smtp_username", nullable = false)
  private String smtpUsername;

  @Column(name = "smtp_password")
  private String smtpPassword;

  @Column(nullable = false)
  private String encryption;

  @Column(name = "from_email", nullable = false)
  private String fromEmail;

  @Column(name = "from_name", nullable = false)
  private String fromName;

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "school_id", nullable = false, unique = true)
  private SchoolEntity school;
}
