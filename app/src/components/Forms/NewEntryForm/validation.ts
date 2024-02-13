export interface AddEntryErrors {
  destination?: string
  startDate?: string
  endDate?: string
}

export const validateForm = (destination?: string) => {
  const errors: AddEntryErrors = {}

  // Validate email field
  if (!destination) {
    errors.destination = 'Trip name is required.'
  }

  // Set the errors and update form validity
  return errors
}
