
export const validateSignup = (formData) => {
  const errors = {}

  if (!formData.first_name.trim()) {
    errors.first_name = 'First name is required'
  }

  if (!formData.last_name.trim()) {
    errors.last_name = 'Last name is required'
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (formData.phone && formData.phone.trim()) {
    const cleanPhone = formData.phone.trim().replace(/\D/g, '')
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      errors.phone = 'Enter a valid phone number (10-15 digits)'
    }
  }

  if (!formData.password) {
    errors.password = 'Password is required'
  } else if (formData.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters'
  }

  return errors
}
