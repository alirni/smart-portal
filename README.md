# Smart Portal Dynamic Form

A dynamic form component built with React, TypeScript, and Ant Design that supports conditional rendering, dynamic options, and form validation.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/username/smart-portal.git
cd smart-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## 📖 API Reference

### DynamicForm Component

```typescript
import { DynamicForm } from './components/DynamicForm';

<DynamicForm formStructure={formStructure} />
```

### Form Structure

The form configuration uses a type-safe structure:

```typescript
interface FormStructure {
  formId: string;
  title: string;
  fields: FormStructureFields[];
}

interface FormStructureFields {
  id: string;
  type: "text" | "select" | "group";
  label: string;
  required?: boolean;
  options?: string[];
  dynamicOptions?: {
    endpoint: string;
    dependsOn: string;
    method: "GET" | "POST";
  };
  visibility?: {
    dependsOn: string;
    condition: "equals";
    value: string;
  };
}
```

### Example Usage

```typescript
const formConfig = {
  formId: "userForm",
  title: "User Information",
  fields: [
    {
      id: "country",
      type: "select",
      label: "Country",
      options: ["USA", "Canada"],
      required: true
    },
    {
      id: "state",
      type: "select",
      label: "State",
      dynamicOptions: {
        endpoint: "/api/states",
        dependsOn: "country",
        method: "GET"
      },
      visibility: {
        dependsOn: "country",
        condition: "equals",
        value: "USA"
      }
    }
  ]
};
```

## 🛠 Development

### Project Structure
```
src/
├── components/
│   ├── DynamicForm.tsx
│   ├── DynamicField.tsx
│   └── StateSelect.tsx
├── api/
│   └── formService.ts
├── types/
│   └── index.ts
└── test/
    └── setup.ts
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤔 Assumptions

1. API Requirements:
   - Endpoints return JSON in the format:
   ```typescript
   {
     success: boolean;
     data: {
       options?: string[];
       [key: string]: any;
     };
   }
   ```
   - Dynamic options endpoints accept query parameters

2. Browser Support:
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - ES6+ features supported
   - Local storage available for caching

3. Network:
   - Stable internet connection for dynamic options
   - API endpoints accessible and CORS-enabled

## 🔐 Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
```

## 📦 Dependencies

- React 19.x
- Ant Design 5.x
- @tanstack/react-query 5.x
- TypeScript 5.x

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
git commit -m 'Add amazing feature'
```
4. Push to the branch:
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details
