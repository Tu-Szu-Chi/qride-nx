import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ApiResponse,
  BoLoginDto,
  BoAuthResponse,
  BoUser,
  CreateBoUserDto,
} from '@org/types';

class Api {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 5000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await this.refreshToken(refreshToken);
            this.setToken(response.access_token, response.refresh_token);
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${response.access_token}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            this.clearToken();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  async login(loginDto: BoLoginDto): Promise<BoAuthResponse> {
    const response = await this.post<BoAuthResponse>('/auth/login', loginDto);
    this.setToken(response.accessToken, response.refreshToken);
    return response;
  }

  async refreshToken(refreshToken: string): Promise<BoAuthResponse> {
    const response = await this.post<BoAuthResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response;
  }

  async get<T = ApiResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  async post<T = ApiResponse>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T = ApiResponse>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async patch<T = ApiResponse>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T = ApiResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }

  async getPosts(page = 1, limit = 10): Promise<GetPostsResponse> {
    return this.get(`/posts?page=${page}&limit=${limit}`);
  }

  async createPost(postData: Partial<Post>) {
    return this.post('/posts', postData);
  }

  async updatePost(id: string, postData: Partial<Post>) {
    return this.patch(`/posts/${id}`, postData);
  }

  async deletePost(id: string): Promise<void> {
    await this.delete(`/posts/${id}`);
  }

  async uploadImage(file: File | Blob): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('image', file);
    return this.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  logout() {
    this.clearToken();
    window.location.href = '/login';
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.get('/auth/check');
      return true;
    } catch (error) {
      return false;
    }
  }

  async createUser(userData: CreateBoUserDto): Promise<BoUser> {
    return this.post<BoUser>('/auth/create-user', userData);
  }
}

const API = new Api('/api/bo');
export default API;
