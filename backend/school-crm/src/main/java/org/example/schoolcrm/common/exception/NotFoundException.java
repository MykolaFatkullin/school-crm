package org.example.schoolcrm.common.exception;

public class NotFoundException extends ApiException {
    public NotFoundException(String message) {
        super(ErrorTypes.NOT_FOUND_ERROR, message);
    }
}
