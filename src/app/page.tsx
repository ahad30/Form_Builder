'use client';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { initialFormData } from '@/lib/initialData';
import FormBuilder from '@/components/FormBuilder';
import PreviewForm from '@/components/PreviewForm';
import FieldPalette from '@/components/FieldPalette';

export default function Home() {
  const [formData, setFormData] = useState(initialFormData);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {!isPreview && <FieldPalette />}
        <div className="flex-1 flex flex-col">
          <nav className="p-4 bg-gray-200">
            <button onClick={() => setIsPreview(!isPreview)} className="bg-blue-500 text-white p-2">
              {isPreview ? 'Back to Edit' : 'Preview'}
            </button>
          </nav>
          {isPreview ? (
            <PreviewForm formData={formData} />
          ) : (
            <FormBuilder formData={formData} onUpdate={setFormData} />
          )}
        </div>
      </div>
    </DndProvider>
  );
}