---
name: react-best-practices
description: Guidelines for writing clean, maintainable, and performant React code in the Smart Travel Management System.
---

# React Best Practices

Use these guidelines when developing or refactoring React components in the Smart Travel Management System frontend.

## 1. Project Structure & Organization
- **Feature-based Organization**: Group related components, hooks, and styles by feature where possible (e.g., `features/auth`, `features/booking`).
- **Common Components**: Place reusable UI components (Buttons, Inputs, Modals) in `src/components/common` or `src/components/ui`.
- **Pages**: Top-level page components should reside in `src/pages`.
- **Layouts**: Layout wrappers (Navbar, Sidebar, Footer) should be in `src/layouts`.

## 2. Component Design
- **Functional Components**: implementation MUST use functional components with Hooks. Class components are discouraged.
- **Single Responsibility**: Each component should do one thing well. If a component grows too large (>200 lines), consider breaking it down.
- **Props**:
  - use **Destructuring** for props to increase readability.
  - defining **Types/Interfaces** for props (if using TypeScript) or PropTypes.
  - use **Default Values** in function arguments rather than `defaultProps`.

## 3. State Management
- **Local State**: Use `useState` for simple, local UI state (e.g., toggle menus, simpler form inputs).
- **Complex State**: Use `useReducer` for complex state logic involving multiple sub-values or where the next state depends on the previous one.
- **Global State**: Use React Context for global app state like Authentication, Theme, or Language.
- **Avoid Prop Drilling**: If you pass props down more than 2-3 levels, consider using Composition or Context.

## 4. Hooks Best Practices
- **Custom Hooks**: Extract reusable logic into custom hooks (named `use[Name]`).
- **Rules of Hooks**: Only call hooks at the top level. Don't call hooks inside loops, conditions, or nested functions.
- **Dependencies**: Always verify the dependency arrays in `useEffect`, `useCallback`, and `useMemo`.

## 5. Performance Optimization
- **Code Splitting**: Use `React.lazy` and `Suspense` for route-based code splitting to reduce initial bundle size.
- **Memoization**:
  - Use `useMemo` for expensive calculations.
  - Use `useCallback` for functions passed as props to memoized child components.
  - Do not over-optimize; premature optimization can lead to complexity.

## 6. Styling
- **CSS Strategy**: Follow the project's existing CSS strategy (Vanilla CSS per user instructions).
- **ClassName Naming**: Use consistent naming conventions (e.g., BEM or descriptive kebab-case) to avoid conflicts.
- **Responsiveness**: Ensure valid responsive design using CSS Media Queries.

## 7. Formatting & Naming
- **Components**: PascalCase (e.g., `UserProfile.jsx`).
- **Functions/Variables**: camelCase (e.g., `handleSubmit`, `isLoading`).
- **Files**: PascalCase for React components, camelCase for non-component files (utils, hooks).

## Example Component Structure

```jsx
import React, { useState, useEffect } from 'react';
// import styles from './MyComponent.module.css'; // If using modules
import './MyComponent.css';

const MyComponent = ({ title, isActive = false, onAction }) => {
  // 1. Hooks
  const [value, setValue] = useState('');

  // 2. Effects
  useEffect(() => {
    // Side effects here
  }, [value]);

  // 3. Event Handlers
  const handleClick = () => {
    if (onAction) onAction(value);
  };

  // 4. Render
  return (
    <div className="my-component">
      <h1>{title}</h1>
      {isActive && <span className="badge">Active</span>}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```
