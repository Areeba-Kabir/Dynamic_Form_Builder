export type FieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "date"
  | "datetime"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "switch";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  colSpan: 1 | 2 | 3 | 4;
  options?: FieldOption[];
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormSchema {
  id: string;
  name: string;
  version: number;
  sections: FormSection[];
}
