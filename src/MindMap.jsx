import { useState, useCallback, useEffect, useRef } from 'react';

import ReactFlow, {
    addEdge,
    Controls,
    MiniMap,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'reactflow';
import * as dagre from '@dagrejs/dagre';
import * as htmlToImage from 'html-to-image';
import { iconMap } from './icons';
import { themeColors, textColors } from './theme';

import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';

// --- Dagre Layout Setup ---
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const layoutNodesAndEdges = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 180, height: 60 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);
        return {
            ...node,
            position: { x, y },
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
        };
    });

    return { nodes: newNodes, edges };
};

// --- React Flow Setup ---
const nodeTypes = { custom: CustomNode };
const edgeColors = themeColors;

const initialNodes = [];

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const colorIndex = useRef(0);

    // --- History for Undo/Redo ---
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const isUndoRedo = useRef(false);

    useEffect(() => {
        if (isUndoRedo.current) {
            isUndoRedo.current = false;
            return;
        }
        if (nodes !== initialNodes || edges.length > 0) {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push({ nodes: structuredClone(nodes), edges: structuredClone(edges) });
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    }, [nodes, edges, history, historyIndex]);

    const undo = () => {
        if (historyIndex <= 0) return;
        isUndoRedo.current = true;
        const prev = history[historyIndex - 1];
        setNodes(prev.nodes);
        setEdges(prev.edges);
        setHistoryIndex(historyIndex - 1);
    };

    const redo = () => {
        if (historyIndex >= history.length - 1) return;
        isUndoRedo.current = true;
        const next = history[historyIndex + 1];
        setNodes(next.nodes);
        setEdges(next.edges);
        setHistoryIndex(historyIndex + 1);
    };

    // --- Core Functionality ---
    const onConnect = useCallback(
        (params) => {
            const color = edgeColors[colorIndex.current];
            colorIndex.current = (colorIndex.current + 1) % edgeColors.length;
            const newEdge = {
                ...params,
                type: 'default',
                animated: true,
                style: { stroke: color, strokeWidth: 4 },
            };
            setEdges((eds) => addEdge(newEdge, eds));
        },
        [setEdges]
    );

    const addNode = () => {
        const newNode = {
            id: crypto.randomUUID(),
            type: 'custom',
            position: {
                x: Math.random() * 500 + 100,
                y: Math.random() * 300 + 100,
            },
            data: { label: 'New Node' },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const addContentNode = () => {
        const newNode = {
            id: crypto.randomUUID(),
            type: 'custom',
            position: {
                x: Math.random() * 500 + 100,
                y: Math.random() * 300 + 100,
            },
            data: { label: 'New Content', transparent: true },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const autoLayout = () => {
        const { nodes: newNodes, edges: newEdges } = layoutNodesAndEdges(nodes, edges, 'TB');
        setNodes([...newNodes]);
        setEdges([...newEdges]);
    };

    // --- File & Export ---
    const handleSave = () => {
        let fileName = prompt('Please enter a file name for your mind map:', 'mind-map.json');
        if (fileName === null) {
            // User cancelled the prompt
            return;
        }
        if (!fileName.endsWith('.json')) {
            fileName += '.json';
        }

        const data = JSON.stringify({ nodes, edges, viewport: localStorage.getItem('viewport') }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleLoad = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const { nodes: loadedNodes, edges: loadedEdges } = JSON.parse(event.target.result);
                    setNodes(loadedNodes);
                    setEdges(loadedEdges);
                } catch {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const exportPng = () => {
        const flow = document.querySelector('.react-flow');
        if (!flow) return;
        htmlToImage.toPng(flow).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'mindmap.png';
            link.href = dataUrl;
            link.click();
        });
    };

    // --- Context Menu & Node Styling ---
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });

    const onNodeContextMenu = (event, node) => {
        event.preventDefault();
        setContextMenu({ visible: true, x: event.clientX, y: event.clientY, nodeId: node.id });
    };

    const closeMenu = () => setContextMenu({ visible: false });

    const onColorChange = (id, color) => {
        setNodes((nds) =>
            nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, color: color } } : n))
        );
    };

    const onTextColorChange = (id, color) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    node.data = { ...node.data, textColor: color };
                }
                return node;
            })
        );
    };

    const onIconChange = (id, icon) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    node.data = { ...node.data, icon: icon };
                }
                return node;
            })
        );
    };

    const onShapeChange = (id, shape) => {
        setNodes((nds) =>
            nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, shape: shape } } : n))
        );
    };

    const toggleCollapse = (nodeId) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === nodeId ? { ...n, data: { ...n.data, collapsed: !n.data.collapsed } } : n
            )
        );
        const childTargets = edges.filter((e) => e.source === nodeId).map((e) => e.target);
        setEdges((eds) =>
            eds.map((e) =>
                e.source === nodeId || childTargets.includes(e.source) ? { ...e, hidden: !e.hidden } : e
            )
        );
    };

    return (

        <div className="w-screen h-screen bg-gray-900">
            {/* --- Top-Left Controls --- */}
            <div className="absolute top-4 left-4 z-50 flex space-x-2">
                <button onClick={addNode} className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow">
                    + Add Node
                </button>
                <button onClick={addContentNode} className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow">
                    + Add Content
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 text-sm font-semibold">
                    Save
                </button>
                <button onClick={handleLoad} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 text-sm font-semibold">
                    Load
                </button>
                <button onClick={undo} className="p-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400" title="Undo">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8a5 5 0 015 5v0a5 5 0 01-5 5H6" />
                    </svg>
                </button>
                <button onClick={redo} className="p-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400" title="Redo">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 15l3-3m0 0l-3-3m3 3H8a5 5 0 00-5 5v0a5 5 0 015 5h8" />
                    </svg>
                </button>
            </div>

            {/* --- Top-Right Controls --- */}
            <div className="absolute top-4 right-4 z-50 flex space-x-2">
                <button onClick={exportPng} className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 text-sm">
                    Export PNG
                </button>
                <button onClick={autoLayout} className="bg-pink-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-pink-600">
                    Auto Layout
                </button>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeContextMenu={onNodeContextMenu}
                onPaneClick={closeMenu}
                onNodeDoubleClick={(_, node) => toggleCollapse(node.id)}
                fitView
                className="react-flow"
                nodeTypes={nodeTypes}
                deleteKeyCode={['Backspace', 'Delete']}
                defaultEdgeOptions={{ type: 'default', animated: true }}
                connectionLineStyle={{ stroke: '#f59e0b', strokeWidth: 2 }}
                onMoveEnd={(_, viewport) => localStorage.setItem('viewport', JSON.stringify(viewport))}
                connectionMode="loose"
                connectionValidator={({ sourceHandle, targetHandle }) => {
                    // Only allow connections from source handles to target handles
                    if (!sourceHandle || !targetHandle) return false;
                    return sourceHandle.endsWith('source') && targetHandle.endsWith('target');
                }}
            >
                <MiniMap />
                <Controls />
                <Background variant="dots" gap={16} size={1} style={{ backgroundColor: '#ffffff' }} />
            </ReactFlow>

            {contextMenu.visible && (
                <div style={{ top: contextMenu.y, left: contextMenu.x, position: 'absolute' }}>
                    <ContextMenu
                        nodeId={contextMenu.nodeId}
                        onColorChange={onColorChange}
                        onShapeChange={onShapeChange}
                        onTextColorChange={onTextColorChange}
                        onIconChange={onIconChange}
                        closeMenu={closeMenu}
                    />
                </div>
            )}
        </div>
    );
};

const ContextMenu = ({ nodeId, onColorChange, onShapeChange, onTextColorChange, onIconChange, closeMenu }) => {
    return (
        <div className="absolute z-50 bg-white p-2 rounded shadow border border-gray-200 w-48">
            <div className="text-xs font-bold text-gray-600 mb-1">Theme Colors</div>
            <div className="grid grid-cols-6 gap-1 mb-2">
                {themeColors.map((color) => (
                    <button
                        key={color}
                        onClick={() => onColorChange(nodeId, color)}
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <div className="text-xs font-bold text-gray-600 mb-1">Shape</div>
            <div className="flex gap-2 mb-2">
                <button onClick={() => onShapeChange(nodeId, 'square')} className="w-6 h-6 border border-gray-400" />
                <button onClick={() => onShapeChange(nodeId, 'rounded')} className="w-6 h-6 border border-gray-400 rounded-md" />
                <button onClick={() => onShapeChange(nodeId, 'pill')} className="w-6 h-6 border border-gray-400 rounded-full" />
            </div>

            <div className="text-xs font-bold text-gray-600 mb-1">Text Color</div>
            <div className="grid grid-cols-6 gap-1 mb-2">
                {textColors.map((color) => (
                    <button
                        key={color}
                        onClick={() => onTextColorChange(nodeId, color)}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <div className="text-xs font-bold text-gray-600 mb-1">Icons</div>
            <div className="grid grid-cols-6 gap-1 mb-2">
                {Object.entries(iconMap).map(([name, Icon]) => (
                    <button
                        key={name}
                        onClick={() => onIconChange(nodeId, name)}
                        className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-200"
                        title={name}
                    >
                        <Icon />
                    </button>
                ))}
            </div>

            <button onClick={closeMenu} className="text-xs text-blue-600 hover:underline">
                Close
            </button>
        </div>
    );
};

const MindMap = () => (
    <ReactFlowProvider>
        <Flow />
    </ReactFlowProvider>
);

export default MindMap;