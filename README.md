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


---

## Sample JSON Schema

{
  "id": "form-123",
  "name": "User Registration Form",
  "version": 1,
  "createdAt": "2026-01-28T10:00:00.000Z",
  "updatedAt": "2026-01-28T10:00:00.000Z",
  "questions": [
    {
      "id": "q-1",
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "placeholder": "Enter your full name",
      "required": true,
      "defaultValue": "",
      "validation": {
        "pattern": "^[a-zA-Z\\s]{3,50}$",
        "message": "Name must be 3-50 characters long and contain only letters"
      },
      "colSpan": 2,
      "section": "Personal Information"
    },
    {
      "id": "q-2",
      "label": "Email Address",
      "name": "email",
      "type": "email",
      "placeholder": "Enter your email",
      "required": true,
      "defaultValue": "",
      "validation": {
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
        "message": "Enter a valid email address"
      },
      "colSpan": 2,
      "section": "Personal Information"
    },
    {
      "id": "q-3",
      "label": "Password",
      "name": "password",
      "type": "password",
      "placeholder": "Enter a password",
      "required": true,
      "defaultValue": "",
      "validation": {
        "pattern": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
        "message": "Password must be at least 8 characters, include letters and numbers"
      },
      "colSpan": 2,
      "section": "Account Details"
    },
    {
      "id": "q-4",
      "label": "Gender",
      "name": "gender",
      "type": "radio",
      "required": true,
      "options": [
        { "id": "opt-1", "label": "Male", "value": "male" },
        { "id": "opt-2", "label": "Female", "value": "female" },
        { "id": "opt-3", "label": "Other", "value": "other" }
      ],
      "colSpan": 1,
      "section": "Personal Information"
    },
    {
      "id": "q-5",
      "label": "Hobbies",
      "name": "hobbies",
      "type": "checkbox",
      "options": [
        { "id": "opt-4", "label": "Reading", "value": "reading" },
        { "id": "opt-5", "label": "Traveling", "value": "traveling" },
        { "id": "opt-6", "label": "Gaming", "value": "gaming" }
      ],
      "colSpan": 2,
      "section": "Personal Information"
    },
    {
      "id": "q-6",
      "label": "Date of Birth",
      "name": "dob",
      "type": "date",
      "required": true,
      "defaultValue": "",
      "colSpan": 2,
      "section": "Personal Information"
    },
    {
      "id": "q-7",
      "label": "Accept Terms and Conditions",
      "name": "terms",
      "type": "switch",
      "required": true,
      "defaultValue": false,
      "colSpan": 4,
      "section": "Agreement"
    },
    {
      "id": "q-8",
      "label": "Submit Form",
      "name": "submit",
      "type": "button",
      "colSpan": 4,
      "section": "Submit"
    }
  ]
}
