import React from 'react';
import { getGenderColor } from '../../utils/familyTreeUtils';
import { useTheme } from '@mui/material';

const FamilyTreeNode = ({ nodeDatum, toggleNode, compactView }) => {
  const theme = useTheme();
  
  // Extract data from node
  const { name, attributes, photo } = nodeDatum;
  const gender = attributes?.gender || 'other';
  const borderColor = getGenderColor(gender);
  const relationshipClass = attributes?.relationship 
    ? `relationship-${attributes.relationship}` 
    : '';
  
  // Node style with proper rendering
  const nodeSize = compactView ? 15 : 20;
  const nameFontSize = compactView ? 10 : 12;
  const detailsFontSize = compactView ? 8 : 10;
  
  return (
    <g>
      {/* Node circle */}
      <circle 
        r={nodeSize} 
        fill={theme.palette.background.paper}
        stroke={borderColor}
        strokeWidth="3"
        strokeOpacity={0.9}
        cx="0"
        cy="0"
        onClick={() => toggleNode()}
      />
      
      {/* Highlight on hover */}
      <circle
        r={nodeSize + 3}
        fill="none"
        stroke={borderColor}
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="3,3"
        cx="0"
        cy="0"
        className="node-highlight"
      />
      
      {/* Image if available */}
      {photo && (
        <image 
          href={photo} 
          x={-nodeSize} 
          y={-nodeSize} 
          height={nodeSize * 2} 
          width={nodeSize * 2} 
          clipPath="url(#clipCircle)"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      
      {/* Name label */}
      <g className="rd3t-label">
        <text 
          className="rd3t-label__title nodeText"
          fill={theme.palette.text.primary}
          x="0" 
          y={nodeSize + 15} 
          textAnchor="middle"
          fontSize={nameFontSize}
          fontWeight="bold"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {name}
        </text>
      </g>
      
      {/* Partner information */}
      {!compactView && attributes?.partner && (
        <g className="rd3t-label__attributes">
          <rect 
            x={-55}
            y={nodeSize + 20}
            width={110}
            height={20}
            rx={4}
            ry={4}
            fill={theme.palette.background.paper}
            opacity={0.8}
          />
          <text
            className={`nodeText ${relationshipClass}`}
            fill={theme.palette.text.secondary}
            x="0"
            y={nodeSize + 33}
            textAnchor="middle"
            fontSize={detailsFontSize}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {`Partner: ${attributes.partner}`}
          </text>
        </g>
      )}
      
      {/* Gender indicator */}
      <text
        fill={borderColor}
        x={nodeSize + 5}
        y={-nodeSize + 5}
        fontSize={detailsFontSize}
        fontWeight="bold"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚧'}
      </text>
    </g>
  );
};

export default FamilyTreeNode; 