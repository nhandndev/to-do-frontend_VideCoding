import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-12 h-12">
        <div className="absolute w-12 h-12 rounded-full border-4 border-slate-100"></div>
        <div className="absolute w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};
