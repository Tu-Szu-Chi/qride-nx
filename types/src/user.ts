export interface UserEntity {
  id: string;
  phone: string;
  type: UserType;
  email?: string;
  password: string;
  first_name: string;
  mid_name?: string; 
  last_name: string;
  address_state: string;
  address_city: string;
  address_detail?: string; 
  birthday?: string; 
  source?: number; 
  whatsapp?: string; 
  facebook?: string; 
  created_at: Date;
  updated_at: Date;
  is_delete: boolean;
}

export type User = Omit<UserEntity, 'created_at' | 'updated_at' | 'is_delete'>;

export type UserVO = Omit<User, 'password' | 'birthday'> & {
  birthday?: string;
}
export type UserDto = Omit<User, 'id' | 'created_at' | 'updated_at' | 'is_delete' | 'birthday'> & {
  birthday?: string;
}
export interface UserUpdateDto {
  email?: string;
  address_detail?: string
  birthday?: string;
  password?: string;
  whatsapp?: string;
  facebook?: string;
  type?: UserType;
  first_name?: string;
  mid_name?: string; 
  last_name?: string;
  address_state?: string;
  address_city?: string;
  is_delete?: boolean;
}

export enum UserType {
  CLIENT = 'client',
}
export enum UserSourceType {
  NONE = 0,
}
