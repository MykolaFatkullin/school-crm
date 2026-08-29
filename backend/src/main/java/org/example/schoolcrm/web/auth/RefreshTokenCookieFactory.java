package org.example.schoolcrm.web.auth;

import java.time.Duration;
import lombok.val;
import org.springframework.http.ResponseCookie;

public class RefreshTokenCookieFactory {

  public static ResponseCookie dropRefreshCookies(boolean isSecure) {
    return getCookieForRefresh("", null, isSecure);
  }

  public static ResponseCookie getCookieForRefresh(String value, Integer maxAge, boolean isSecure) {
    val cookieBuilder =
        ResponseCookie.from("refreshToken", value)
            .httpOnly(true)
            .secure(isSecure)
            .sameSite("Strict")
            .path("/");

    if (maxAge == null) {
      return cookieBuilder.maxAge(0).build();
    }

    return cookieBuilder.maxAge(Duration.ofDays(maxAge)).build();
  }
}
