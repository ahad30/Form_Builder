import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { FormData, FormField } from '@/lib/types';
import FormFieldComponent from './FormField';
import SettingsSidebar from './SettingsSidebar';
import { Sidebar } from 'primereact/sidebar';


interface FormBuilderProps {
  formData: FormData;
  onUpdate: (updated: FormData) => void;
}

const NEW_FIELD_TYPE = 'new-field';
const EXISTING_FIELD_TYPE = 'existing-field';

const FormBuilder: React.FC<FormBuilderProps> = ({ formData, onUpdate }) => {
   const [visibleRight, setVisibleRight] = useState(false);
  const [fields, setFields] = useState<FormField[]>(formData.fields);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const selectedField = fields.find(f => f.id === selectedFieldId) || null;

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const dragged = fields[dragIndex];
    const newFields = [...fields];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, dragged);
    setFields(newFields);
    onUpdate({ ...formData, fields: newFields });
  };

  const addNewField = (fieldType: FormField['type'], index: number) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: fieldType,
      label: `${fieldType === 'text' ? 'Name' :fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`,
      name: `${fieldType === 'text' ? 'name' : fieldType}`,
      placeholder: `Enter your ${fieldType === 'text' ? 'Name' : fieldType}`,
      required: false,
      columnWidth: '100%',
      options: fieldType === 'select' || fieldType === 'checkbox' || fieldType === 'radio' ? ['Option 1=option1'] : undefined,
      content: fieldType === 'acceptance' ? '<p><strong>I agree with all terms and conditions.</strong></p>\n' : undefined,
    };
    const newFields = [...fields];
    newFields.splice(index, 0, newField);
    setFields(newFields);
    onUpdate({ ...formData, fields: newFields });
  };

  const [, drop] = useDrop({
    accept: [NEW_FIELD_TYPE, EXISTING_FIELD_TYPE],
    drop: (item: any) => {
      if (item.fieldType) { 
        addNewField(item.fieldType, fields.length); 
      }
    },
  });

  drop(dropRef)

  const handleDelete = (id: string) => {
    const newFields = fields.filter(f => f.id !== id);
    setFields(newFields);
    onUpdate({ ...formData, fields: newFields });
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const handleDuplicate = (id: string) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      const index = fields.indexOf(field);
      const dup = { ...field, id: Date.now().toString() };
      const newFields = [...fields];
      newFields.splice(index + 1, 0, dup);
      setFields(newFields);
      onUpdate({ ...formData, fields: newFields });
    }
  };

  const handleSettings = (id: string) => {
    setSelectedFieldId(id);
    setVisibleRight(true)
  };

  const handleClose =() => {
     setSelectedFieldId(null)
    setVisibleRight(false)


  }

  const handleUpdateField = (updated: FormField) => {
    const newFields = fields.map(f => f.id === updated.id ? updated : f);
    setFields(newFields);
    onUpdate({ ...formData, fields: newFields });
  };

  return (
<>
    <div ref={dropRef} className={`flex-1 p-4 bg-white`}>
    
      <h1 className='text-center font-bold text-xl mt-5 mb-5'> (Change  the order of existing form fields by dragging and dropping)</h1>
      <div className={`grid grid-cols-1 lg:grid-cols-3 p-4 bg-white transition-all duration-300  }`}>
        {fields.map((field, index) => (
          <FormFieldComponent
            key={field.id}
            field={field}
            index={index}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onSettings={handleSettings}
            moveField={moveField}
          />
        ))}
      </div>
     
    </div>
     {selectedField && (
     <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className='w-[500px] p-5 bg-gray-100'>
        <SettingsSidebar
          field={selectedField}
          onUpdate={handleUpdateField}
          onClose={handleClose}
        />
      </Sidebar>
      )}
</>
  );
};

export default FormBuilder; 