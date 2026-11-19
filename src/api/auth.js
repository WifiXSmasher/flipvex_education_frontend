import api from './axios'

export const loginRequest = (data) =>
  api.post('/auth/login/', data).then((res) => res.data)

export const registerRequest = (data) =>
  api.post('/auth/register/', data).then((res) => res.data)

export const verifyOTPRequest = (data) =>
  api.post('/auth/verify-otp/', data).then((res) => res.data)

export const resendOTPRequest = (email) =>
  api.post('/auth/resend-otp/', { email }).then((res) => res.data)

export const fetchMe = () => api.get('/auth/me/').then((res) => res.data)

export const logoutRequest = (refresh) =>
  api.post('/auth/logout/', { refresh }).then((res) => res.data)

// Reset password section
export const requestPasswordReset = (email) =>
  api.post('/auth/forgot-password/', { email }).then((res) => res.data)

export const confirmPasswordReset = (data) =>
  api.post('/auth/reset-password/', data).then((res) => res.data)