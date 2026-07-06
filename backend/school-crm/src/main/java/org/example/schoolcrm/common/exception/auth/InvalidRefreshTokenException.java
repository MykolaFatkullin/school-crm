package org.example.schoolcrm.common.exception;

public class InvalidRefreshTokenException extends AuthException {

    public InvalidRefreshTokenException() {
        super("Invalid or expired refresh token");
    }
}
