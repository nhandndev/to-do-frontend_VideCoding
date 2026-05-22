import type { ApiResponse } from '../types/api';
import type { Todo, CreateTodoRequest, UpdateTodoRequest, TodoStatus } from '../types/todo';
import axiosClient from './axiosClient';

export const todoApi = {
  createTodo: (data: CreateTodoRequest): Promise<ApiResponse<Todo>> => {
    return axiosClient.post('/todos', data);
  },

  getMyTodos: (): Promise<ApiResponse<Todo[]>> => {
    return axiosClient.get('/todos');
  },

  getTodoById: (id: number): Promise<ApiResponse<Todo>> => {
    return axiosClient.get(`/todos/${id}`);
  },

  updateTodo: (id: number, data: UpdateTodoRequest): Promise<ApiResponse<Todo>> => {
    return axiosClient.put(`/todos/${id}`, data);
  },

  updateStatus: (id: number, status: TodoStatus): Promise<ApiResponse<Todo>> => {
    return axiosClient.patch(`/todos/${id}/status`, { status });
  },

  deleteTodo: (id: number): Promise<ApiResponse<null>> => {
    return axiosClient.delete(`/todos/${id}`);
  },
};
