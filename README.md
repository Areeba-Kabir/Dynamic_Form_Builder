Dynamic Form Builder (Next.js + Zustand + MUI)

A dynamic, schema-driven form builder and renderer.  
Forms are created, edited, versioned, and rendered entirely from JSON.

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Zustand** – state management
- **Material UI (MUI)** – UI components
- **UUID** – unique IDs for forms, sections, fields

---

## Features

### Form Builder
- Create & edit forms dynamically
- Multiple **field types**
- **Sections & grouping**
- Field options (dropdown, checkbox, radio)
- Required & validation rules
- Column span support (1–4 columns)
- Save as **Draft**

## Form Renderer
- Render form from JSON schema
- Conditional field rendering (dependencies)
- Apply validations
- Clear form
- Submit form 

# Advanced
- Form versioning
- Schema-first architecture
- Easily extensible for backend persistence

## Supported Field Types

- Text
- Email
- Password
- TextArea
- Date
- DateTime
- Dropdown
- Checkbox
- Radio Group
- Toggle (Switch)
- Button

---

## Architecture Overview

FormSchema {
  id: string;
  name: string;
  version: number;      
  questions: Question[];
  createdAt: string;    
  updatedAt: string;
}

Question {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: string | boolean;
  validation?: { pattern?: string; message?: string };
  options?: Option[];
  colSpan?: 1 | 2 | 3 | 4; 
  section?: string;
}

Form
│ Questions[]
│ Validation
│ ─ Options
│  ├── Dependency
│  └── Layout (colSpan)
└── Versioning
