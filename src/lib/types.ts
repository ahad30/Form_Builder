export interface FormField {
  id: string;
  type: 'text' | 'email' | 'date' | 'time' | 'file' | 'select' | 'checkbox' | 'radio' | 'acceptance';
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  columnWidth: string;
  options?: string[];
  content?: string; 
  inlineStyle?: string; 
}

export interface FormData {
  id: string;
  version: string;
  name: string;
  toEmail: string;
  subject: string;
  successMessage: string;
  fields: FormField[];
}