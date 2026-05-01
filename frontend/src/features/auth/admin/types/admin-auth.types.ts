export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  message: string;
  admin_id: number;
}

export interface AdminVerifyOtpResponse {
  access_token: string;
  expires_in: number;
  admin: Admin;
}