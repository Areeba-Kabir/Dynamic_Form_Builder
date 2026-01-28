// store/formStore.ts
import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type QuestionType = "text" | "checkbox" | "radio" | "button";


export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[]; // for checkbox/radio
}

export interface FormSchema {
  id: string;
  name: string;
  questions: Question[];
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
