import { RISK } from './constants';

// Curtailment risk zones for NY map
export const zones = [
  // Western NY
  { id: 'W1', region: 'Western NY', risk: RISK.MEDIUM, dcCount: 8, svgX: 55, svgY: 170, rx: 30, ry: 20 },
  { id: 'W2', region: 'Western NY', risk: RISK.HIGH, dcCount: 29, svgX: 85, svgY: 190, rx: 35, ry: 22 },
  { id: 'W3', region: 'Western NY', risk: RISK.LOW, dcCount: 12, svgX: 135, svgY: 180, rx: 28, ry: 18 },

  // North Country
  { id: 'X1', region: 'North Country', risk: RISK.MEDIUM, dcCount: 6, svgX: 300, svgY: 60, rx: 35, ry: 20 },
  { id: 'X2', region: 'North Country', risk: RISK.LOW, dcCount: 4, svgX: 260, svgY: 80, rx: 25, ry: 15 },
  { id: 'X3', region: 'North Country', risk: RISK.LOW, dcCount: 3, svgX: 340, svgY: 75, rx: 25, ry: 15 },

  // Central NY
  { id: 'Z1', region: 'Central NY', risk: RISK.HIGH, dcCount: 15, svgX: 225, svgY: 155, rx: 35, ry: 22 },
  { id: 'Z2', region: 'Central NY', risk: RISK.MEDIUM, dcCount: 10, svgX: 190, svgY: 175, rx: 28, ry: 18 },
  { id: 'Z3', region: 'Central NY', risk: RISK.LOW, dcCount: 7, svgX: 260, svgY: 170, rx: 25, ry: 16 },

  // Capital Region
  { id: 'Y1', region: 'Capital Region', risk: RISK.MEDIUM, dcCount: 11, svgX: 330, svgY: 165, rx: 30, ry: 20 },
  { id: 'Y2', region: 'Capital Region', risk: RISK.LOW, dcCount: 5, svgX: 350, svgY: 190, rx: 25, ry: 15 },

  // Southern Tier
  { id: 'S1', region: 'Southern Tier', risk: RISK.LOW, dcCount: 4, svgX: 170, svgY: 230, rx: 50, ry: 18 },

  // NYC
  { id: 'NYC', region: 'NYC', risk: RISK.MEDIUM, dcCount: 55, svgX: 375, svgY: 305, rx: 25, ry: 20 },

  // Long Island
  { id: 'LI', region: 'Long Island', risk: RISK.LOW, dcCount: 11, svgX: 420, svgY: 320, rx: 40, ry: 12 },
];
