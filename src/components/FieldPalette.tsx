// File: components/FieldPalette.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

const fieldTypes = ['text', 'email', 'date', 'time', 'file', 'select', 'checkbox', 'radio', 'acceptance'];

const NEW_FIELD_TYPE = 'new-field';

const FieldPalette: React.FC = () => {
  return (
    <div className="w-48 p-4 bg-gray-100 border-r">
      <h2 className="text-lg mb-2">Add Fields</h2>
      {fieldTypes.map((type) => {
        const [, drag] = useDrag({
          type: NEW_FIELD_TYPE,
          item: { fieldType: type },
        });
        return (
          <div
            key={type}
            ref={drag}
            className="p-2 bg-white border mb-2 cursor-move"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        );
      })}
    </div>
  );
};

export default FieldPalette;