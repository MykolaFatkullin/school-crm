package org.example.schoolcrm.common.exception.auth;

import org.example.schoolcrm.common.exception.ApiException;

import static org.example.schoolcrm.common.exception.ErrorTypes.AUTH_ERROR;

public class AuthException extends ApiException {
    public AuthException(String message) {
        super(AUTH_ERROR, message);
    }
}
