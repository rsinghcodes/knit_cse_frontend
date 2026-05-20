import React, { useState, useEffect, useRef } from 'react';

interface EditableDateProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  tag?: React.ElementType;
}

const EditableDate: React.FC<EditableDateProps> = ({ value, onSave, className = '', tag: Tag = 'span' }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Try to convert DD/MM/YYYY to YYYY-MM-DD for the native input component
  const getInitialInputValue = (dateStr: string) => {
    if (!dateStr) return '';
    // If it's already YYYY-MM-DD, just return
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    
    // Attempt DD/MM/YYYY parse
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    // Attempt DD-MM-YYYY
    const partsDash = dateStr.split('-');
    if (partsDash.length === 3 && partsDash[0].length === 2) {
      const [day, month, year] = partsDash;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return '';
  };
  
  const [inputValue, setInputValue] = useState(() => getInitialInputValue(value));
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus and select all text when edit starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.showPicker?.(); // Show native date picker popup if supported
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    
    if (!inputValue) {
      onSave('');
      return;
    }
    
    // Format YYYY-MM-DD back to DD/MM/YYYY for display
    const parts = inputValue.split('-');
    if (parts.length === 3) {
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      if (formattedDate !== value) {
        onSave(formattedDate);
      }
    } else {
      if (inputValue !== value) {
        onSave(inputValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleBlur();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(getInitialInputValue(value)); // Revert
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="date"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-white text-black px-1 rounded shadow-sm outline-none border border-blue-400 focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    );
  }

  return (
    <Tag
      onClick={() => {
        setInputValue(getInitialInputValue(value));
        setIsEditing(true);
      }}
      className={`cursor-pointer hover:bg-white/20 hover:text-white px-1 -mx-1 rounded transition-colors ${className}`}
      title="Click to edit date"
    >
      {value || 'DD/MM/YYYY'}
    </Tag>
  );
};

export default EditableDate;
