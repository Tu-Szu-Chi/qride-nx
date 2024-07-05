export interface UserEntity {
  id: string;
  phone: string;
  email?: string;
  password: string;
  first_name: string;
  mid_name?: string; 
  last_name: string;
  address_state: string;
  address_city: string;
  address_detail?: string; 
  birthday?: Date; 
  source?: number; 
  whatsapp?: string; 
  facebook?: string; 
  created_at: Date;
  updated_at: Date;
  is_delete: boolean;
}

export type User = Omit<UserEntity, 'created_at' | 'updated_at' | 'is_delete'>;

export type UserVO = Omit<User, 'password'>