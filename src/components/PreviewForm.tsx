// File: components/PreviewForm.tsx
import React from 'react';
import { FormData, FormField } from '@/lib/types';

interface PreviewFormProps {
  formData: FormData;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ formData }) => {
  console.log(formData)

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'date':
      case 'time':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            className="border p-2 w-full"
          />
        );
      case 'file':
        return <input type="file" className="border p-2 w-full" required={field.required} />;
      case 'select':
        return (
          <select className="border p-2 w-full" required={field.required}>
            <option>{field.placeholder}</option>
            {field.options?.map((opt, i) => {
              const [label, value] = opt.split('=');
              return <option key={i} value={value}>{label}</option>;
            })}
          </select>
        );
      case 'checkbox':
      case 'radio':
        return (
          <div className={field.inlineStyle === 'inline' ? 'flex space-x-2' : 'space-y-2'}>
            {field.options?.map((opt, i) => {
              const [label, value] = opt.split('=');
              return (
                <label key={i} className="flex items-center">
                  <input type={field.type} name={field.name} value={value} required={field.required && field.type === 'radio'} className='me-2'/>
                  {label}
                </label>
              );
            })}
          </div>
        );
      case 'acceptance':
        return (
          <label className="flex items-center">
            <input type="checkbox" required={field.required} className='me-2'/>
            <span dangerouslySetInnerHTML={{ __html: field.content || '' }} />
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <form className="p-4">
      <h1 className="text-2xl mb-4">{formData.name}</h1>
      <div className="grid grid-cols-3 items-center">
        {formData.fields.map((field) => (
          <div key={field.id} className={`p-2 ${field.columnWidth ? `w-[${field.columnWidth}]` : 'w-full'}`}>
            {field.label && <label className="block mb-1">{field.label} {field.required ? '*' : ''}</label>}
            {renderField(field)}
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Submit</button>
    </form>
  );
};

export default PreviewForm;