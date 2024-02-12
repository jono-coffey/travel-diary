import { emailValidation } from '../../constants/regex'

export interface RegisterErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

export const validateForm = (email: string, password: string, confirmedPassword: string) => {
  const errors: RegisterErrors = {}

  // Validate email field
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!emailValidation.test(email)) {
    errors.email = 'Email is invalid.'
  }

  // Validate password field
  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (!confirmedPassword) {
    errors.confirmPassword = 'Password is required.'
  } else if (password !== confirmedPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  // Set the errors and update form validity
  return errors
}
