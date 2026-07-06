package org.example.schoolcrm.common.exception.not_found;

import java.util.UUID;

public class SchoolNotFoundException extends NotFoundException {

    public SchoolNotFoundException(UUID schoolId) {
        super("School not found by id: " + schoolId);
    }
}
