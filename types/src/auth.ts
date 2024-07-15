import { UserSourceType, UserType } from "./user";

export interface RegisterDto {
    phone: string;
    type: UserType;
    password: string;
    re_password: string;
    first_name: string;
    mid_name?: string;
    last_name: string;
    address_state: string;
    address_city: string;
    address_detail?: string;
    birthday?: string;
    source?: UserSourceType;
    email?: string;
    whatsapp?: string;
    facebook?: string;
}

export interface LoginDto {
    phone: string;
    password: string;
}
export interface SendOtpDto {
    phone: string;
    type: OtpTypeEnum;
    'g-recaptcha-response'?: string;
  }
  
  export interface VerifyOtpDto {
    phone: string;
    otp: string;
    type: OtpTypeEnum;
  }
  export interface ResetPasswordDto {
    password: string;
    re_password: string;
  }
  export enum OtpTypeEnum {
    REGISTER = 'register',
    RESET_PASSWORD = 'reset-password',
  }
   