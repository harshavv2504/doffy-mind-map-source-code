# 🧠 DO.ffy - Interactive Mind Mapping Application

<div align="center">

![DO.ffy Logo](https://img.shields.io/badge/DO.ffy-Mind%20Mapping-blue?style=for-the-badge&logo=react)

**DO.ffy** is a powerful, highly customizable mind mapping application built with modern web technologies. Create, organize, and visualize your ideas with an intuitive drag-and-drop interface, rich customization options, and intelligent auto-layout capabilities.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![React Flow](https://img.shields.io/badge/React%20Flow-11.11.4-FF6B6B?style=flat)](https://reactflow.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Use Cases](#-use-cases)
- [🚀 Quick Start](#-quick-start)
- [📖 Documentation](#-documentation)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ Architecture](#️-architecture)
- [🎨 Customization](#-customization)
- [📱 Browser Support](#-browser-support)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🎨 **Rich Visual Experience**
- **Infinite Canvas**: Smooth panning and zooming with a clean dot-grid background
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark gray interface with vibrant accent colors
- **Smooth Animations**: Fluid transitions and hover effects throughout the interface

### 🎯 **Advanced Node System**
- **Dual Node Types**: 
  - **Standard Nodes**: Solid background nodes for primary concepts
  - **Content Nodes**: Transparent nodes for supplementary information
- **Rich Customization**:
  - 🎨 **6 Theme Colors**: Yellow, red, green, blue, purple, and pink
  - 🔷 **3 Shape Options**: Square, rounded corners, and pill-shaped
  - ✍️ **12 Text Colors**: Complete color palette for text styling
  - 🏷️ **12 Icon Types**: Brain, lightbulb, checkmark, warning, flag, bomb, star, bolt, user, folder, cloud, and code icons
- **Interactive Resizing**: Drag handles to resize nodes with minimum size constraints
- **Inline Editing**: Click any node to edit text directly

### 🔗 **Intelligent Connection System**
- **Smart Handles**: Connection points appear on hover for clean interface
- **Multi-directional**: Connect from any side (top, bottom, left, right)
- **Animated Edges**: Colorful, animated connections with automatic color cycling
- **Validation**: Prevents invalid connections and ensures proper flow

### 🤖 **Auto-Layout Engine**
- **Dagre Algorithm**: Professional hierarchical layout with optimal spacing
- **One-Click Organization**: Instantly arrange complex mind maps
- **Customizable Direction**: Top-to-bottom layout with balanced node distribution
- **Collision Detection**: Prevents node overlap during automatic arrangement

### 💾 **Data Management**
- **Save/Load System**: 
  - Custom filename support with automatic .json extension
  - Complete state preservation including viewport position
  - Error handling for corrupted files
- **Export Capabilities**:
  - High-quality PNG export with full canvas capture
  - Maintains visual fidelity and transparency
- **Local Storage**: Automatic viewport position saving

### ⚡ **User Experience**
- **Full History Support**: Unlimited undo/redo with complete state tracking
- **Context Menu**: Right-click customization with organized options
- **Keyboard Shortcuts**: Delete key for quick node/edge removal
- **Drag & Drop**: Intuitive node positioning and connection creation
- **Double-click Actions**: Collapse/expand functionality (planned feature)

---

## 🎯 Use Cases

### 📚 **Education & Learning**
- Course planning and curriculum mapping
- Concept visualization for complex topics
- Study guides and knowledge organization
- Research project planning

### 💼 **Business & Strategy**
- Project planning and workflow design
- Organizational charts and team structures
- Process mapping and documentation
- Strategic planning sessions

### 🎨 **Creative Projects**
- Story plotting and character development
- Design thinking and brainstorming
- Content planning for blogs/videos
- Creative writing organization

### 🔬 **Technical Documentation**
- System architecture diagrams
- API relationship mapping
- Database schema visualization
- Software development planning

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/doffy.git
   cd doffy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Documentation

### 🕹️ **User Guide**

#### **Creating Your First Mind Map**

1. **Add Nodes**: Click "Add Node" or "Add Content" buttons in the top-left
2. **Edit Text**: Click on any node to edit its label inline
3. **Create Connections**: Hover over a node to reveal handles, then drag to connect
4. **Customize Appearance**: Right-click any node to access the customization menu

#### **Advanced Features**

**Node Customization Menu**:
- **Theme Colors**: Choose from 6 predefined colors optimized for readability
- **Shapes**: Select square, rounded, or pill shapes for visual hierarchy
- **Text Colors**: 12 color options including high-contrast choices
- **Icons**: Add contextual icons to categorize and enhance nodes

**File Operations**:
- **Save**: Exports complete mind map as JSON with custom naming
- **Load**: Import previously saved mind maps with full state restoration
- **Export PNG**: Generate high-quality images for sharing and presentations

**Navigation & Layout**:
- **Pan**: Click and drag on empty canvas areas
- **Zoom**: Use mouse wheel or trackpad gestures
- **Auto-Layout**: Organize nodes automatically with professional spacing
- **Fit View**: Double-click canvas to center and fit all nodes

#### **Keyboard Shortcuts**

| Action | Shortcut |
|--------|----------|
| Delete selected items | `Delete` or `Backspace` |
| Undo | `Ctrl+Z` (planned) |
| Redo | `Ctrl+Y` (planned) |
| Save | `Ctrl+S` (planned) |

### 🔧 **Developer Guide**

#### **Project Structure**

```
doffy/
├── src/
│   ├── components/
│   │   ├── MindMap.jsx          # Main application component
│   │   └── CustomNode.jsx       # Custom node implementation
│   ├── utils/
│   │   ├── icons.js            # Icon definitions and exports
│   │   ├── theme.js            # Color themes and styling
│   │   └── useLocalStorage.js  # Local storage hook
│   ├── App.jsx                 # Root application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── public/                    # Static assets
├── docs/                     # Documentation files
└── tests/                    # Test files (planned)
```

#### **Key Components**

**MindMap.jsx**:
- Main application logic and state management
- React Flow integration and configuration
- Event handlers for user interactions
- File operations and export functionality

**CustomNode.jsx**:
- Custom node component with resizing capabilities
- Handle positioning and visibility logic
- Icon and styling integration
- Inline editing functionality

#### **State Management**

The application uses React's built-in state management with hooks:
- `useNodesState` and `useEdgesState` from React Flow
- Custom history management for undo/redo
- Local storage integration for persistence

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1**: Modern functional components with hooks
- **React DOM 18.3.1**: Efficient DOM rendering and updates

### **Visualization & Canvas**
- **React Flow 11.11.4**: Interactive node-based diagrams and flowcharts
- **@reactflow/node-resizer**: Interactive node resizing capabilities
- **@dagrejs/dagre 1.1.5**: Graph layout algorithms for auto-arrangement

### **Styling & UI**
- **Tailwind CSS 3.4.4**: Utility-first CSS framework
- **React Icons 5.5.0**: Comprehensive icon library
- **PostCSS 8.4.38**: CSS processing and optimization
- **Autoprefixer 10.4.19**: Automatic vendor prefix handling

### **Build Tools & Development**
- **Vite 7.0.4**: Fast build tool and development server
- **@vitejs/plugin-react 4.3.1**: React integration for Vite
- **ESLint 9.3.0**: Code linting and quality assurance

### **Utilities**
- **html-to-image 1.11.13**: Canvas to image conversion for PNG export
- **crypto.randomUUID()**: Secure unique ID generation for nodes

---

## 🏗️ Architecture

### **Component Hierarchy**

```
App
└── MindMap (ReactFlowProvider)
    └── Flow
        ├── ReactFlow
        │   ├── CustomNode (multiple instances)
        │   ├── MiniMap
        │   ├── Controls
        │   └── Background
        └── ContextMenu (conditional)
```

### **Data Flow**

1. **User Interaction**: Click, drag, or right-click events
2. **State Update**: React state management updates nodes/edges
3. **React Flow**: Renders updated visualization
4. **Persistence**: Auto-save viewport, manual save/load operations

### **Key Algorithms**

**Auto-Layout (Dagre)**:
- Creates directed graph from nodes and edges
- Applies hierarchical layout algorithm
- Updates node positions with optimal spacing
- Maintains edge relationships and flow direction

**History Management**:
- Captures complete state snapshots on changes
- Implements undo/redo stack with index tracking
- Prevents infinite loops during history navigation

---

## 🎨 Customization

### **Theming**

The application uses a carefully curated color palette defined in `src/theme.js`:

**Node Background Colors**:
```javascript
themeColors = [
  '#fde047', // Warm yellow - for important concepts
  '#fca5a5', // Soft red - for warnings or critical items
  '#86efac', // Fresh green - for positive outcomes
  '#93c5fd', // Calm blue - for information and processes
  '#c4b5fd', // Gentle purple - for creative ideas
  '#f9a8d4', // Soft pink - for personal or emotional content
]
```

**Text Colors**:
- High contrast options (black, white)
- Semantic colors (red for errors, green for success)
- Brand colors (blue, purple, orange)
- Neutral tones (gray variations)

### **Adding Custom Icons**

To add new icons, modify `src/icons.js`:

```javascript
import { FaNewIcon } from 'react-icons/fa';

export const iconMap = {
  // existing icons...
  FaNewIcon,
};
```

### **Extending Node Types**

Create new node types by:
1. Extending the `CustomNode` component
2. Adding new node type to React Flow configuration
3. Implementing custom styling and behavior

---

## 📱 Browser Support

### **Fully Supported**
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

### **Partially Supported**
- Chrome 80-89 (some features may be limited)
- Firefox 78-87 (performance may vary)
- Safari 13 (limited CSS features)

### **Not Supported**
- Internet Explorer (any version)
- Chrome < 80
- Firefox < 78

### **Mobile Support**
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

---

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Setting up the development environment
- Coding standards and best practices
- Pull request process
- Issue reporting guidelines

### **Quick Contribution Steps**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Areas for Contribution**

- 🎨 New themes and customization options
- 📱 Mobile responsiveness improvements
- ⌨️ Keyboard shortcuts and accessibility
- 🔧 Performance optimizations
- 📚 Documentation and tutorials
- 🧪 Testing and quality assurance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### **MIT License Summary**
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgments

### **Open Source Libraries**
- [React Flow](https://reactflow.dev/) - For the excellent interactive diagram library
- [Dagre](https://github.com/dagrejs/dagre) - For the graph layout algorithms
- [React Icons](https://react-icons.github.io/react-icons/) - For the comprehensive icon library
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework

### **Inspiration**
- Mind mapping pioneers like Tony Buzan
- Modern design principles from leading UI/UX teams
- The open-source community for continuous innovation

### **Contributors**
Thanks to all contributors who have helped make DO.ffy better! 🎉

---

<div align="center">

**Made with ❤️ by the DO.ffy team**

[⭐ Star this repo](../../stargazers) • [🐛 Report issues](../../issues) • [💡 Request features](../../issues/new)

</div>