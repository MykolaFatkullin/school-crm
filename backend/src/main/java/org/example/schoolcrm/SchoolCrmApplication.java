package org.example.schoolcrm;

import java.util.Locale;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class SchoolCrmApplication {

  public static void main(String[] args) {
    Locale.setDefault(Locale.ENGLISH);
    SpringApplication.run(SchoolCrmApplication.class, args);
  }
}
