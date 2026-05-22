import React, { useEffect, useState } from 'react';
import { todoApi } from '../../api/todoApi';
import type { Todo } from '../../types/todo';
import { TodoItem } from '../todo/TodoItem';
import { TodoForm } from '../todo/TodoForm';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Plus, LayoutList } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      const res = await todoApi.getMyTodos();
      if (res.code === 1000) {
        setTodos(res.result || []);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleSubmitTodo = async (data: any) => {
    if (editingTodo) {
      await todoApi.updateTodo(editingTodo.id, {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate || null,
      });
    } else {
      await todoApi.createTodo({
        title: data.title,
        description: data.description,
      });
    }
    handleCloseModal();
    fetchTodos();
  };

  const handleToggleTodo = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    try {
      await todoApi.updateStatus(id, newStatus as any);
      fetchTodos();
    } catch (err) {
      console.error('Failed to toggle status');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await todoApi.deleteTodo(id);
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Tasks</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and track your daily activities</p>
        </div>
        <Button onClick={handleOpenCreateModal} className="shrink-0">
          <Plus size={18} className="mr-2" />
          Add Task
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {todos.length === 0 && !error && !loading ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
            <LayoutList size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No tasks found</h3>
          <p className="text-slate-500 mt-2 max-w-sm">
            You don't have any tasks yet. Click the "Add Task" button to create your first task.
          </p>
          <Button onClick={handleOpenCreateModal} variant="secondary" className="mt-6">
            Create your first task
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={handleToggleTodo}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={editingTodo ? 'Edit Task' : 'New Task'}
      >
        <TodoForm 
          initialData={editingTodo} 
          onSubmit={handleSubmitTodo} 
          onCancel={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};
