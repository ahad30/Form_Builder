import React from 'react';

interface HoverActionsProps {
  onSettings: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const HoverActions: React.FC<HoverActionsProps> = ({ onSettings, onDelete, onDuplicate }) => {
  return (
    <div className="absolute top-0 right-0 flex space-x-2 p-1 bg-white border border-gray-300 rounded">
      <button onClick={onSettings} className="text-blue-500 hover:text-blue-700">Settings</button>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
      <button onClick={onDuplicate} className="text-green-500 hover:text-green-700">Duplicate</button>
    </div>
  );
};

export default HoverActions;