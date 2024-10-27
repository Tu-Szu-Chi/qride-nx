import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ACCESS_TOKEN } from '@org/common';
import { ApiResponse, Error } from '@org/types';
import Cookies from 'js-cookie';
import { GetPostsResponse, Post, UploadImageResponse } from '../types/index';

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
        const token = Cookies.get(ACCESS_TOKEN);
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
      (response: AxiosResponse<ApiResponse>) => response,
      (error: AxiosError<Error>) => {
        throw error.response?.data;
      }
    );
  }

  setToken(token: string) {
    Cookies.set(ACCESS_TOKEN, token, { secure: true, sameSite: 'strict' });
  }

  clearToken() {
    Cookies.remove(ACCESS_TOKEN);
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
}

const API = new Api('/api/bo');
export default API;
