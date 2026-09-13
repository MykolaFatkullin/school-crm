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
import java.math.BigDecimal;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "school_payment_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolPaymentSettingsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "api_key", nullable = false)
  private String apiKey;

  @Column(name = "secret_key", nullable = false)
  private String secretKey;

  @Column(nullable = false)
  private String currency;

  @Column(name = "tax_rate_percentage", nullable = false, precision = 5, scale = 2)
  private BigDecimal taxRatePercentage;

  @Column(name = "invoice_prefix", nullable = false)
  private String invoicePrefix;

  @Column(name = "default_payment_due_days", nullable = false)
  private Integer defaultPaymentDueDays;

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "school_id", nullable = false, unique = true)
  private SchoolEntity school;
}
