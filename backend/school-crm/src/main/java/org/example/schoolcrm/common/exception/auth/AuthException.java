package org.example.schoolcrm.common.exception;

import static org.example.schoolcrm.common.exception.ErrorTypes.AUTH_ERROR;

public class AuthException extends ApiException {
    public AuthException(String message) {
        super(AUTH_ERROR, message);
    }
}
