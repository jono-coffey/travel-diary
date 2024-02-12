export interface AddEntryErrors {
  destination?: string
  startDate?: string
  endDate?: string
}

export const validateForm = (destination?: string, startDate?: number, endDate?: number) => {
  const errors: AddEntryErrors = {}

  // Validate email field
  if (!destination) {
    errors.destination = 'Email is required.'
  }

  // Validate password field
  if (!startDate) {
    errors.startDate = 'Start date is required.'
  }

  if (!endDate) {
    errors.endDate = 'End date is required.'
  }

  // Set the errors and update form validity
  return errors
}
