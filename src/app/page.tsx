'use client';

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { initialFormData } from '@/lib/initialData';
import FormBuilder from '@/components/FormBuilder';
import PreviewForm from '@/components/PreviewForm';
import FieldPalette from '@/components/FieldPalette';
import { FormData } from '@/lib/types';

export default function Home() {
  const [formData, setFormData] = useState<FormData>(() => {
    
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('formData');
      return savedData ? JSON.parse(savedData) : initialFormData;
    }
    return initialFormData;
  });
  const [isPreview, setIsPreview] = useState(false);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {isPreview && <FieldPalette />}
        <div className="flex-1 flex flex-col">
          <nav className="p-4 bg-gray-200">
            <div className='flex justify-end'>
              <button onClick={() => setIsPreview(!isPreview)} className="bg-blue-500 text-white p-2">
              {!isPreview ? 'Edit' : 'Preview'}
            </button>
            </div>
          </nav>
          {!isPreview ? (
            <PreviewForm formData={formData} />
          ) : (
            <FormBuilder formData={formData} onUpdate={setFormData} />
          )}
        </div>
      </div>
    </DndProvider>
  );
}