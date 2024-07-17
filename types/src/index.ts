/* eslint-disable @typescript-eslint/no-explicit-any */
export * from './auth';
export * from './user';

export interface Error {
    bizCode: number;
    message?: string;
}
export interface ApiResponse<T = any> {
    bizCode: number;
    data: T;
    message?: string;
  }