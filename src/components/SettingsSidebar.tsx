// File: components/SettingsSidebar.tsx
import React, { useState } from 'react';
import { FormField } from '@/lib/types';

interface SettingsSidebarProps {
  field: FormField | null;
  onUpdate: (updatedField: FormField) => void;
  onClose: () => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ field, onUpdate, onClose }) => {
  console.log(field)
  if (!field) return null;

  const [localField, setLocalField] = useState(field);

  const handleChange = (key: keyof FormField, value: any) => {
    setLocalField({ ...localField, [key]: value });
  };

  const handleOptionsChange = (value: string) => {
    handleChange('options', value.split('\n'));
  };

  const save = () => {
    onUpdate(localField);
    onClose();
  };

  const isOptionField = ['select', 'checkbox', 'radio'].includes(field.type);

  return (
    <div className="w-64 p-4 bg-gray-100 border-l fixed right-0 top-0 bottom-0">
      <h2 className="text-lg mb-2 font-bold">{field.label} Field Settings</h2>
      <button onClick={onClose} className="absolute top-2 right-2">X</button>
      <label className="block mb-2">
        Label:
        <input
          type="text"
          value={localField.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="border p-1 w-full"
        />
      </label>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          value={localField.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="border p-1 w-full"
        />
      </label>
      <label className="block mb-2">
        Placeholder:
        <input
          type="text"
          value={localField.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          className="border p-1 w-full"
        />
      </label>
      <label className="block mb-2">
        Required:
        <input
          type="checkbox"
          checked={!!localField.required}
          onChange={(e) => handleChange('required', e.target.checked)}
        />
      </label>
      {isOptionField && (
        <label className="block mb-2">
          Options (key=value per line):
          <textarea
            value={(localField.options || []).join('\n')}
            onChange={(e) => handleOptionsChange(e.target.value)}
            className="border p-1 w-full"
          />
        </label>
      )}
      <button onClick={save} className="bg-blue-500 text-white p-2">Save</button>
    </div>
  );
};

export default SettingsSidebar;