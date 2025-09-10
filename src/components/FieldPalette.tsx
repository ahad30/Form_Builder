// File: components/FieldPalette.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

const fieldTypes = ['text', 'email', 'date', 'time', 'file', 'select', 'checkbox', 'radio', 'acceptance'];

const NEW_FIELD_TYPE = 'new-field';

const FieldPalette: React.FC = () => {
  return (
    <div className="w-[300px] p-4 bg-gray-100 border-r">
      <div className='mt-[70px]'>
        <h2 className="text-lg mb-2 font-bold">Add Fields(Drag & Drop)</h2>
      {fieldTypes.map((type) => {
        const drafRef = React.useRef<HTMLDivElement>(null);
        const [, drag] = useDrag({
          type: NEW_FIELD_TYPE,
          item: { fieldType: type },
        });
        drag(drafRef);
        return (
          <div
            key={type}
            ref={drafRef}
            className="p-2 bg-white border mb-2 cursor-move"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default FieldPalette;