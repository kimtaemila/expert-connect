
import { GraphData } from './types';

export const mockGraphData: GraphData = {
  nodes: [
    { id: 'e1', name: 'Dr. Sarah Chen', group: 0, val: 20, color: '#c26dbc' },
    { id: 'e2', name: 'John Parker', group: 0, val: 20, color: '#c26dbc' },
    { id: 'e3', name: 'Maria Rodriguez', group: 0, val: 20, color: '#c26dbc' },
    { id: 'e4', name: 'Michael Zhang', group: 0, val: 20, color: '#c26dbc' },
    { id: 'e5', name: 'Rebecca Johnson', group: 0, val: 20, color: '#c26dbc' },
    
    { id: 's1', name: 'AI Ethics', group: 1, val: 15, color: '#4ecdc4' },
    { id: 's2', name: 'Data Privacy', group: 1, val: 12, color: '#4ecdc4' },
    { id: 's3', name: 'Medical Research', group: 1, val: 14, color: '#4ecdc4' },
    { id: 's4', name: 'Cybersecurity', group: 1, val: 16, color: '#4ecdc4' },
    { id: 's5', name: 'Regulatory Compliance', group: 1, val: 13, color: '#4ecdc4' },
    { id: 's6', name: 'Healthcare Tech', group: 1, val: 15, color: '#4ecdc4' },
    
    { id: 'i1', name: 'Healthcare', group: 2, val: 18, color: '#ff9a3c' },
    { id: 'i2', name: 'Technology', group: 2, val: 18, color: '#ff9a3c' },
    { id: 'i3', name: 'Finance', group: 2, val: 17, color: '#ff9a3c' }
  ],
  links: [
    { source: 'e1', target: 's1', value: 5 },
    { source: 'e1', target: 's2', value: 3 },
    { source: 'e1', target: 's3', value: 4 },
    { source: 'e1', target: 's5', value: 4 },
    { source: 'e1', target: 's6', value: 5 },
    { source: 'e2', target: 's4', value: 5 },
    { source: 'e2', target: 's2', value: 4 },
    { source: 'e3', target: 's3', value: 5 },
    { source: 'e3', target: 's6', value: 4 },
    { source: 'e4', target: 's1', value: 4 },
    { source: 'e4', target: 's4', value: 5 },
    { source: 'e5', target: 's5', value: 5 },
    { source: 'e5', target: 's2', value: 4 },
    
    { source: 'e1', target: 'i1', value: 5 },
    { source: 'e2', target: 'i2', value: 5 },
    { source: 'e3', target: 'i1', value: 5 },
    { source: 'e4', target: 'i2', value: 4 },
    { source: 'e4', target: 'i3', value: 3 },
    { source: 'e5', target: 'i3', value: 5 },
    
    { source: 's1', target: 'i2', value: 3 },
    { source: 's2', target: 'i1', value: 4 },
    { source: 's2', target: 'i3', value: 3 },
    { source: 's3', target: 'i1', value: 5 },
    { source: 's4', target: 'i2', value: 4 },
    { source: 's4', target: 'i3', value: 3 },
    { source: 's5', target: 'i1', value: 3 },
    { source: 's5', target: 'i3', value: 4 },
    { source: 's6', target: 'i1', value: 5 }
  ]
};
