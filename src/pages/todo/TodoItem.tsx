import React from 'react';
import type { Todo } from '../../types/todo';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Edit2, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, currentStatus: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  isToggling?: boolean;
  isDeleting?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onEdit, 
  onDelete,
  isToggling,
  isDeleting
}) => {
  const isCompleted = todo.status === 'DONE';

  return (
    <Card className={cn(
      "p-4 transition-all duration-200 hover:shadow-md group flex items-start gap-4",
      isCompleted ? "bg-slate-50 border-slate-100" : "bg-white"
    )}>
      <button 
        onClick={() => onToggle(todo.id, todo.status)}
        disabled={isToggling}
        className={cn(
          "flex-shrink-0 mt-1 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isCompleted ? "text-emerald-500 hover:text-emerald-600" : "text-slate-300 hover:text-primary",
          isToggling && "opacity-50 cursor-wait"
        )}
      >
        {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "text-base font-semibold truncate transition-colors",
          isCompleted ? "text-slate-400 line-through" : "text-slate-800"
        )}>
          {todo.title}
        </h3>
        
        {todo.description && (
          <p className={cn(
            "mt-1 text-sm line-clamp-2",
            isCompleted ? "text-slate-400" : "text-slate-600"
          )}>
            {todo.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            isCompleted ? "bg-emerald-100 text-emerald-700" : 
            todo.status === 'IN_PROGRESS' ? "bg-blue-100 text-blue-700" : 
            todo.status === 'CANCELED' ? "bg-slate-100 text-slate-700" :
            "bg-orange-100 text-orange-700"
          )}>
            {todo.status.replace('_', ' ')}
          </span>
          
          {todo.dueDate && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-slate-400 hover:text-primary hover:bg-primary/10"
          onClick={() => onEdit(todo)}
        >
          <Edit2 size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
          onClick={() => onDelete(todo.id)}
          isLoading={isDeleting}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
};
