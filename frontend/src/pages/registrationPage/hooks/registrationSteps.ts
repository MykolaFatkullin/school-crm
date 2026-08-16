import { RegisterForm } from '../model';

export const registerSteps = [
  {
    stepNumber: 1,
    title: 'Create your school',
    description: 'Set up workspace in minutes',
  },
  {
    stepNumber: 2,
    title: 'Create your password',
    description: 'Secure your school account',
  },
];

export const MAX_STEPS = registerSteps.length;

export const getStepByField = (field: keyof RegisterForm) => {
  switch (field) {
    case 'schoolName':
    case 'firstName':
    case 'lastName':
      return 0;

    case 'password':
    case 'email':
      return 1;

    default:
      return 0;
  }
};
