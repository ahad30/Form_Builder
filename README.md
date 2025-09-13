
# 📝 Form Builder

A dynamic, drag-and-drop form builder built with Next.js, React, TypeScript, and react-dnd.  
Create and customize forms with various field types, preview submissions, and persist form data using local storage.

---

## ✨ Features

- Drag-and-Drop Interface – Add and reorder form fields intuitively with `react-dnd`.
- Multiple Field Types – Text, email, date, time, file, select, checkbox, radio, and acceptance fields.
- Settings Sidebar – Edit field properties (label, name, placeholder, required, options, content) in real time.
- Preview Mode – Preview and test the form with live validation before saving.
- Persistent Data – Form structure is saved in `localStorage` and restored on reload.
- Visual Feedback – Automatically blurs main content when the settings panel is open for a focused editing experience.
- File Upload Handling – Display uploaded file names in the submitted data table instead of raw file objects.
- Plain Text Acceptance Fields – Automatically strip HTML tags for simplified acceptance field content.

---

## 🛠 Prerequisites

- Node.js `v18+`
- npm or Yarn
- A modern browser (Chrome, Firefox, Edge, etc.)

---

## 🚀 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/form-builder.git
cd form-builder

# Install dependencies
npm install
# or
yarn install
````

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### Form Builder Mode

1. Drag field types (e.g., Text, Email, Acceptance) from the left panel to the form canvas.
2. Reorder fields by dragging them within the canvas.
3. Click Settings on a field to edit properties (label, name, required, etc.).
4. Use Delete to remove a field or Duplicate to copy it.

### Preview Mode

1. Click the Preview button in the top navigation.
2. Fill out the form and submit it.
3. View submitted data in a table below the form.
4. A brief success message will appear after submission.

### Persistence

* Changes are automatically saved to `localStorage`.
* To reset the form, run this in the browser console:

```javascript
localStorage.removeItem('formData');
```

---

## 📂 Project Structure

```
form-builder/
├── app/
│   ├── page.tsx            # Main page with FormBuilder and PreviewForm
│   ├── globals.css         # Global styles (Tailwind CSS)
    ├── layout.tsx          # Main Layout
├── components/
│   ├── FormBuilder.tsx      # Drag-and-drop form builder component
│   ├── FormField.tsx        # Individual field renderer
│   ├── FieldPalette.tsx     # Sidebar with available field types
│   ├── HoverActions.tsx     # Edit/Delete/Duplicate field actions
│   ├── PreviewForm.tsx      # Preview and submission handling
│   ├── SettingsSidebar.tsx  # Field settings panel
├── lib/
│   ├── initialData.ts       # Initial form schema
│   ├── types.ts             # TypeScript types and interfaces
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

---

## 📦 Dependencies

* [Next.js](https://nextjs.org/) – React framework with SSR and SSG support
* [React](https://react.dev/) – Core UI library
* [TypeScript](https://www.typescriptlang.org/) – Static type checking
* [react-dnd](https://react-dnd.github.io/react-dnd/about) – Drag-and-drop functionality
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling framework


