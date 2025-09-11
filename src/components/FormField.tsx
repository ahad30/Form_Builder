// File: components/FormField.tsx
import React, { useState } from 'react';
import { FormField as FieldType } from '@/lib/types';
import HoverActions from './HoverActions';
import { useDrag, useDrop } from 'react-dnd';

interface FormFieldProps {
  field: FieldType;
  index: number;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSettings: (id: string) => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
}

const ITEM_TYPE = 'existing-field';

const FormField: React.FC<FormFieldProps> = ({ field, index, onDelete, onDuplicate, onSettings, moveField }) => {

  const [isHovering, setIsHovering] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'date':
      case 'time':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="border p-2 w-full"
            disabled
          />
        );
      case 'file':
        return <input type="file" className="border p-2 w-full" disabled />;
      case 'select':
        return (
          <select className="border p-2 w-full" disabled>
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
                  <input type={field.type} name={field.name} value={value} disabled className='me-2'/>
                  {label}
                </label>
              );
            })}
          </div>
        );
      case 'acceptance':
        return (
          <label className="flex items-center">
            <input type="checkbox" disabled  className='me-2'/>
            <span dangerouslySetInnerHTML={{ __html: field.content || '' }} />
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`relative  p-4 border mb-2 ${field.columnWidth ? `w-[${field.columnWidth}]` : 'w-full'} ${isDragging ? 'opacity-50 bg-red-500' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {field.label && <label className={` block mb-1`}>{field.label} <span className={`${field.required? "text-red-500" : ""}`}>{field.required ? '*' : ''}</span>  </label>}
      {renderField()}
      {isHovering && (
        <HoverActions
          onSettings={() => onSettings(field.id)}
          onDelete={() => onDelete(field.id)}
          onDuplicate={() => onDuplicate(field.id)}
        />
      )}
    </div>
  );
};

export default FormField;