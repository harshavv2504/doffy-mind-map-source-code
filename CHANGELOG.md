# Changelog

All notable changes to DO.ffy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of DO.ffy mind mapping application
- Dynamic canvas with infinite panning and zooming
- Rich node customization with colors, shapes, and icons
- Dual node types (standard and transparent content nodes)
- Effortless drag-to-connect functionality
- Intelligent auto-layout using Dagre algorithm
- Full undo/redo history support
- Save/load functionality with custom filenames
- PNG export capability
- Context menu for node customization
- Responsive design with Tailwind CSS

### Features

#### Core Functionality
- **Interactive Canvas**: Full-screen canvas with dot-grid background
- **Node Management**: Add, edit, delete, and customize nodes
- **Connection System**: Drag-and-drop edge creation between nodes
- **Auto-Layout**: Automatic hierarchical arrangement of mind maps
- **File Operations**: Save to JSON and load from JSON files
- **Export**: High-quality PNG image export

#### Node Customization
- **Colors**: 6 predefined theme colors for node backgrounds
- **Shapes**: Square, rounded, and pill-shaped nodes
- **Text Colors**: 12 different text color options
- **Icons**: 12 different icon badges from React Icons
- **Transparency**: Content nodes with transparent backgrounds
- **Resizing**: Interactive node resizing with handles

#### User Experience
- **History**: Full undo/redo support for all operations
- **Context Menu**: Right-click customization menu
- **Keyboard Support**: Delete key for removing nodes/edges
- **Visual Feedback**: Hover effects and smooth animations
- **Responsive Design**: Works on different screen sizes

### Technical Stack
- **Frontend**: React 18.3.1 with functional components and hooks
- **Canvas**: React Flow 11.11.4 for interactive diagrams
- **Styling**: Tailwind CSS 3.4.4 for responsive design
- **Build Tool**: Vite 7.0.4 for fast development and building
- **Layout**: Dagre algorithm for automatic node arrangement
- **Icons**: React Icons 5.5.0 for icon library
- **Export**: html-to-image 1.11.13 for PNG generation

### Dependencies
- `@dagrejs/dagre`: ^1.1.5 - Graph layout algorithm
- `html-to-image`: ^1.11.13 - Canvas to image conversion
- `react`: ^18.3.1 - Core React library
- `react-dom`: ^18.3.1 - React DOM rendering
- `react-icons`: ^5.5.0 - Icon component library
- `reactflow`: ^11.11.4 - Interactive node-based diagrams

### Development Dependencies
- `@vitejs/plugin-react`: ^4.3.1 - Vite React plugin
- `autoprefixer`: ^10.4.19 - CSS autoprefixer
- `eslint`: ^9.3.0 - JavaScript linting
- `postcss`: ^8.4.38 - CSS processing
- `tailwindcss`: ^3.4.4 - Utility-first CSS framework
- `vite`: ^7.0.4 - Build tool and dev server

## [0.0.0] - 2024-12-XX

### Added
- Initial project setup
- Basic React application structure
- Vite configuration for development and building
- Tailwind CSS integration
- ESLint configuration for code quality