import React, { useState, useEffect } from 'react';

import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';

import '@reactflow/node-resizer/dist/style.css';
import { iconMap } from './icons';



const CustomNode = ({ id, data, selected }) => {
  const Icon = data.icon ? iconMap[data.icon] : null;
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    data.label = label;
  }, [label, data]);

  const borderRadius = data.shape === 'pill' ? 999 : data.shape === 'rounded' ? 8 : 0;

  return (
    <div
      className={`group relative ${data.transparent ? "p-4 w-full h-full" : "border-2 border-slate-300 shadow-lg p-4 w-full h-full"}`}
      style={{ 
        backgroundColor: data.transparent ? 'transparent' : (data.color || '#ffffff'),
        borderRadius: borderRadius,
      }}
    >
      <NodeResizer isVisible={selected} minWidth={180} minHeight={60} />

      {!data.transparent && <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
      
      {Icon && (
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
          <Icon style={{ color: '#334155' }} />
        </div>
      )}
      
      <div className="flex items-center justify-center w-full h-full">
        <input 
          value={label} 
          onChange={(e) => setLabel(e.target.value)} 
          className="nodrag text-center bg-transparent focus:outline-none font-semibold w-full"
          style={{ color: data.textColor || '#1e293b' }}
        />
      </div>

      {!data.transparent && <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
    </div>
  );
};

export default CustomNode;

