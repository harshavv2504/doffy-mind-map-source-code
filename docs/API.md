# DO.ffy API Documentation

## Overview

DO.ffy is a client-side React application that provides a comprehensive API for mind mapping functionality. This document outlines the key components, hooks, and utilities available for developers.

## Core Components

### MindMap Component

The main application component that orchestrates the entire mind mapping experience.

```jsx
import MindMap from './MindMap';

function App() {
  return <MindMap />;
}
```

**Props**: None (self-contained component)

**Features**:
- React Flow integration
- Node and edge state management
- File operations (save/load/export)
- History management (undo/redo)
- Context menu system

### CustomNode Component

A highly customizable node component with resizing, styling, and interaction capabilities.

```jsx
const CustomNode = ({ id, data, selected }) => {
  // Component implementation
};
```

**Props**:
- `id` (string): Unique identifier for the node
- `data` (object): Node data including label, styling, and configuration
- `selected` (boolean): Whether the node is currently selected

**Data Object Structure**:
```javascript
{
  label: string,           // Display text
  color: string,           // Background color (hex)
  textColor: string,       // Text color (hex)
  shape: string,           // 'square' | 'rounded' | 'pill'
  icon: string,            // Icon identifier from iconMap
  transparent: boolean,    // Whether node has transparent background
  collapsed: boolean       // Collapse state (future feature)
}
```

## Utility Functions

### Layout Algorithm

```javascript
import { layoutNodesAndEdges } from './MindMap';

const { nodes: newNodes, edges: newEdges } = layoutNodesAndEdges(
  nodes,    // Array of node objects
  edges,    // Array of edge objects
  'TB'      // Direction: 'TB' (top-bottom) or 'LR' (left-right)
);
```

### File Operations

#### Save Mind Map
```javascript
const handleSave = () => {
  const fileName = prompt('Enter filename:', 'mind-map.json');
  // Saves current state as JSON file
};
```

#### Load Mind Map
```javascript
const handleLoad = () => {
  // Opens file picker and loads JSON mind map
};
```

#### Export PNG
```javascript
const exportPng = () => {
  // Exports current canvas as PNG image
};
```

## Configuration Objects

### Theme Colors

```javascript
// src/theme.js
export const themeColors = [
  '#fde047', // yellow
  '#fca5a5', // red
  '#86efac', // green
  '#93c5fd', // blue
  '#c4b5fd', // purple
  '#f9a8d4', // pink
];

export const textColors = [
  '#1e293b', // slate-800
  '#ffffff', // white
  '#ef4444', // red-500
  // ... more colors
];
```

### Icon Map

```javascript
// src/icons.js
import { FaBrain, FaLightbulb, /* ... */ } from 'react-icons/fa';

export const iconMap = {
  FaBrain,
  FaLightbulb,
  // ... more icons
};
```

## Hooks

### useLocalStorage

Custom hook for persistent local storage with JSON serialization.

```javascript
import { useLocalStorage } from './useLocalStorage';

const [value, setValue] = useLocalStorage('key', defaultValue);
```

**Parameters**:
- `key` (string): Storage key
- `defaultValue` (any): Default value if key doesn't exist

**Returns**: `[value, setValue]` tuple similar to `useState`

## React Flow Integration

### Node Types

```javascript
const nodeTypes = { 
  custom: CustomNode 
};
```

### Edge Configuration

```javascript
const defaultEdgeOptions = {
  type: 'default',
  animated: true,
  style: { stroke: color, strokeWidth: 4 }
};
```

### Connection Validation

```javascript
const connectionValidator = ({ source, target, sourceHandle, targetHandle }) => {
  if (!sourceHandle || !targetHandle) return false;
  return sourceHandle.endsWith('source') && targetHandle.endsWith('target');
};
```

## Event Handlers

### Node Events

```javascript
// Context menu
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  // Show customization menu
};

// Double-click (collapse/expand)
const onNodeDoubleClick = (event, node) => {
  toggleCollapse(node.id);
};
```

### Connection Events

```javascript
const onConnect = useCallback((params) => {
  const newEdge = {
    ...params,
    type: 'default',
    animated: true,
    style: { stroke: color, strokeWidth: 4 }
  };
  setEdges(eds => addEdge(newEdge, eds));
}, [setEdges]);
```

## State Management

### Node State

```javascript
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
```

### Edge State

```javascript
const [edges, setEdges, onEdgesChange] = useEdgesState([]);
```

### History State

```javascript
const [history, setHistory] = useState([]);
const [historyIndex, setHistoryIndex] = useState(-1);
```

## Customization API

### Node Styling

```javascript
const onColorChange = (id, color) => {
  setNodes(nds => 
    nds.map(n => 
      n.id === id 
        ? { ...n, data: { ...n.data, color } }
        : n
    )
  );
};

const onShapeChange = (id, shape) => {
  setNodes(nds => 
    nds.map(n => 
      n.id === id 
        ? { ...n, data: { ...n.data, shape } }
        : n
    )
  );
};
```

### Icon Management

```javascript
const onIconChange = (id, icon) => {
  setNodes(nds => 
    nds.map(node => 
      node.id === id 
        ? { ...node, data: { ...node.data, icon } }
        : node
    )
  );
};
```

## Performance Considerations

### Optimization Techniques

1. **React.memo**: Used for expensive components
2. **useCallback**: Prevents unnecessary re-renders
3. **Lazy Loading**: Icons and components loaded on demand
4. **Debouncing**: Input changes debounced for performance

### Memory Management

1. **Cleanup**: Event listeners and timeouts properly cleaned up
2. **State Optimization**: Minimal state updates and efficient data structures
3. **Image Handling**: PNG export uses efficient canvas-to-image conversion

## Error Handling

### File Operations

```javascript
try {
  const { nodes: loadedNodes, edges: loadedEdges } = JSON.parse(fileContent);
  setNodes(loadedNodes);
  setEdges(loadedEdges);
} catch (error) {
  alert('Invalid JSON file');
}
```

### Canvas Operations

```javascript
const exportPng = () => {
  const flow = document.querySelector('.react-flow');
  if (!flow) return;
  
  htmlToImage.toPng(flow)
    .then(dataUrl => {
      // Handle success
    })
    .catch(error => {
      console.error('Export failed:', error);
    });
};
```

## Browser Compatibility

### Required Features

- ES6+ support
- Canvas API
- File API
- Local Storage
- CSS Grid and Flexbox

### Polyfills

No polyfills currently required for supported browsers (Chrome 90+, Firefox 88+, Safari 14+).

## Extension Points

### Adding New Node Types

1. Create new component extending CustomNode
2. Register in nodeTypes object
3. Add type selection in UI
4. Implement custom styling and behavior

### Custom Export Formats

1. Implement export function using canvas APIs
2. Add UI controls for new format
3. Handle format-specific options and settings

### Integration APIs

Future extension points for:
- Cloud storage integration
- Real-time collaboration
- Plugin system
- External data sources