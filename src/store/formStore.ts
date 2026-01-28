// store/formStore.ts
import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type QuestionType = "text" | "checkbox" | "radio" | "button";

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
  | "switch"
  | "button";

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: string | boolean;
  validation?: { pattern?: string; message?: string };
  options?: Option[];
  colSpan?: 1 | 2 | 3 | 4; // for 4-column layout
  section?: string; // optional section/group
}



export interface FormSchema {
  id: string;
  name: string;
  version: number;      // new
  questions: Question[];
  createdAt: string;    // timestamp
  updatedAt: string;
}


interface FormStore {
  forms: FormSchema[];
  addForm: (form: FormSchema) => void;
  updateForm: (form: FormSchema) => void;
  deleteForm: (id: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  forms: [],
  addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
  updateForm: (updatedForm) =>
    set((state) => ({
      forms: state.forms.map((f) =>
        f.id === updatedForm.id ? updatedForm : f
      ),
    })),
  deleteForm: (id) =>
    set((state) => ({ forms: state.forms.filter((f) => f.id !== id) })),
}));
