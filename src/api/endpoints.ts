const API_ENDPOINTS = {
  register: "/auth/register",
  login: "/auth/login",
  verifyEmail: "/auth/verify-email",
  forgotPassword: "/auth/password-reset/request",
  resetPassword: "/auth/password-reset/confirm",
  changePassword: "/auth/change-password",
  changeEmail: "/auth/change-signup-email",
  resendEmail: "/auth/resend-verification"
};

export default API_ENDPOINTS;
