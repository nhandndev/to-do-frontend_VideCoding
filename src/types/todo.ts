export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  status?: TodoStatus;
}

export interface UpdateTodoRequest {
  title: string;
  description?: string;
  status: TodoStatus;
  dueDate?: string | null;
}
