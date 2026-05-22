import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Todo, TodoStatus } from '../../types/todo';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

const todoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'CANCELED']).optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  initialData?: Todo | null;
  onSubmit: (data: TodoFormData) => Promise<void>;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      dueDate: initialData?.dueDate ? initialData.dueDate.split('T')[0] : '',
      status: initialData?.status || 'TODO',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        placeholder="What needs to be done?"
        {...register('title')}
        error={errors.title?.message}
      />
      
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          className="flex min-h-[100px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Add some details..."
          {...register('description')}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {initialData && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register('status')}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
              <option value="CANCELED">Canceled</option>
            </select>
          </div>
        )}
        
        <Input
          label="Due Date"
          type="date"
          {...register('dueDate')}
          error={errors.dueDate?.message}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Save Changes' : 'Create Todo'}
        </Button>
      </div>
    </form>
  );
};
