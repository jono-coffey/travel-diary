export interface AddTripErrors {
  name?: string
  startDate?: string
  endDate?: string
}

export const validateForm = (name?: string, startDate?: number, endDate?: number) => {
  const errors: AddTripErrors = {}

  // Validate email field
  if (!name) {
    errors.name = 'Trip name is required.'
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
