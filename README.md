Form Builder
A dynamic, drag-and-drop form builder application built with Next.js, React, TypeScript, and react-dnd. Create and customize forms with various field types, preview submissions, and persist form data using local storage.
Features

Drag-and-Drop Interface: Add and reorder form fields using an intuitive drag-and-drop system powered by react-dnd.
Field Types: Supports multiple field types including text, email, date, time, file, select, checkbox, radio, and acceptance.
Settings Sidebar: Edit field properties (label, name, placeholder, required, options, content) with a settings panel that appears on field selection.
Preview Mode: Preview the form with real-time input validation and submit data to view in a table format.
Local Storage: Persists form structure across page refreshes using browser local storage.
Visual Feedback: Blurs the main content and disables hover actions when the settings sidebar is open for a focused editing experience.
File Upload Handling: Displays file names in the submitted data table instead of raw file objects.
Plain Text for Acceptance Fields: Allows editing acceptance field content as plain text, stripping HTML tags for simplicity.

Prerequisites

Node.js (v18 or higher)
npm or Yarn
A modern web browser (Chrome, Firefox, Edge, etc.)

Installation

Clone the Repository:
git clone https://github.com/your-username/form-builder.git
cd form-builder


Install Dependencies:
npm install

or
yarn install


Run the Development Server:
npm run dev

or
yarn dev


Open your browser and navigate to http://localhost:3000 to view the application.


Usage

Form Builder Mode:

Drag field types (e.g., Text, Email, Acceptance) from the left palette to the form canvas.
Reorder fields by dragging them within the canvas.
Click the "Settings" button on a field to edit its properties (label, name, required, etc.) in the sidebar.
Use "Delete" to remove a field or "Duplicate" to copy it.


Preview Mode:

Click the "Preview" button in the top navigation to switch to Preview Mode.
Fill out the form and submit it to view submitted data in a table below the form.
A success message appears briefly after submission, as defined in the form schema.


Persistence:

Form changes are automatically saved to localStorage and persist across page refreshes.
To reset the form, clear localStorage using the browser console:localStorage.removeItem('formData');




Project Structure
form-builder/
├── app/
│   ├── page.tsx          # Main page with FormBuilder and PreviewForm
│   ├── globals.css       # Global styles (Tailwind CSS)
├── components/
│   ├── FormBuilder.tsx   # Main form builder component with drag-and-drop
│   ├── FormField.tsx     # Renders individual form fields
│   ├── FieldPalette.tsx  # Palette for dragging new fields
│   ├── HoverActions.tsx  # Settings, Delete, Duplicate buttons for fields
│   ├── PreviewForm.tsx   # Form preview and submission handling
│   ├── SettingsSidebar.tsx # Sidebar for editing field properties
├── lib/
│   ├── initialData.ts    # Initial form schema
│   ├── types.ts          # TypeScript interfaces for form data
├── public/               # Static assets
├── package.json          # Project dependencies and scripts
└── README.md             # This file

Dependencies

Next.js: Framework for server-side rendering and static site generation.
React: Frontend library for building UI components.
TypeScript: Static typing for better code reliability.
react-dnd: Drag-and-drop functionality for fields.
Tailwind CSS: Utility-first CSS framework for styling.
