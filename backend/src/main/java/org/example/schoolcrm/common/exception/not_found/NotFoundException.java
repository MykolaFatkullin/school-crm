package org.example.schoolcrm.common.exception.not_found;

import org.example.schoolcrm.common.exception.ApiException;
import org.example.schoolcrm.common.exception.ErrorTypes;

public class NotFoundException extends ApiException {
    public NotFoundException(String message) {
        super(ErrorTypes.NOT_FOUND_ERROR, message);
    }
}
