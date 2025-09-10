import React, { useState } from 'react';
import { FormData as FormDataTypes, FormField } from '@/lib/types';

interface PreviewFormProps {
  formData: FormDataTypes;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ formData }) => {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    const data: Record<string, any> = {};

    formDataObj.forEach((value, key) => {
      
      if (value instanceof File) {
        if (value.name) {
          data[key] = value.name; 
        }
      } else {
   
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      }
    });
    console.log(data)
    setSubmittedData(data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'date':
      case 'time':
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="border p-2 w-full"
          />
        );
      case 'file':
        return <input type="file" name={field.name} className="border p-2 w-full" required={field.required} />;
      case 'select':
        return (
          <select name={field.name} className="border p-2 w-full" required={field.required}>
            <option value="">{field.placeholder}</option>
            {field.options?.map((opt, i) => {
              const [label, value] = opt.split('=');
              return <option key={i} value={value}>{label}</option>;
            })}
          </select>
        );
      case 'checkbox':
        return (
          <div className={field.inlineStyle === 'inline' ? 'flex space-x-2' : 'space-y-2'}>
            {field.options?.map((opt, i) => {
              const [label, value] = opt.split('=');
              return (
                <label key={i} className="flex items-center">
                  <input type="checkbox" name={field.name} value={value} required={field.required} className='me-2'/>
                  {label}
                </label>
              );
            })}
          </div>
        );
      case 'radio':
        return (
          <div className={field.inlineStyle === 'inline' ? 'flex space-x-2' : 'space-y-2'}>
            {field.options?.map((opt, i) => {
              const [label, value] = opt.split('=');
              return (
                <label key={i} className="flex items-center">
                  <input type="radio" name={field.name} value={value} required={field.required} className='me-2'/>
                  {label}
                </label>
              );
            })}
          </div>
        );
      case 'acceptance':
        return (
          <label className="flex items-center">
            <input type="checkbox" name={field.name} required={field.required} className='me-2'/>
            <span className='text-blue-500 font-normal' dangerouslySetInnerHTML={{ __html: field.content || '' }} />
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 w-[90%] mx-auto">
      <h1 className="text-2xl mb-4">{formData.name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {formData.fields.map((field) => (
            <div key={field.id} className={`p-2 ${field.columnWidth ? `w-[${field.columnWidth}]` : 'w-full'}`}>
              {field.label && <label className={` block mb-1`}>{field.label} <span className={`${field.required? "text-red-500" : ""}`}>{field.required ? '*' : ''}</span>  </label>}
              {renderField(field)}
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Submit</button>
        </div>
      </form>
      {showSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {formData.successMessage}
        </div>
      )}
      {submittedData && (
        <div className="mt-4">
          <h2 className="text-lg mb-2">Submitted Data</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Field</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(submittedData).map(([key, value]) => (
                <tr key={key}>
                  <td className="border p-2">{key}</td>
                  <td className="border p-2">
                    {Array.isArray(value) ? value.join(', ') : value.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PreviewForm;