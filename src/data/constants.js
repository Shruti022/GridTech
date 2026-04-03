// Grid frequency thresholds (Hz)
export const FREQ_NOMINAL = 60.0;
export const FREQ_HIGH = 60.02;    // Above this → SUPPLY event
export const FREQ_LOW = 59.98;     // Below this → DEMAND event
export const FREQ_CRITICAL = 59.95;

// Simulation
export const TICK_MS = 1000;
export const HISTORY_LENGTH = 120; // 2 minutes of data
export const TRIGGER_MAGNITUDE = 0.06;
export const TRIGGER_DECAY = 8; // seconds to recover

// Facility status
export const STATUS = {
  STANDBY: 'STANDBY',
  RESPONDING: 'RESPONDING',
};

// Event types
export const EVENT_TYPE = {
  SUPPLY: 'SUPPLY',   // freq high → ramp up GPUs to absorb
  DEMAND: 'DEMAND',   // freq low → scale down GPUs to shed
};

export const STATUS_COLORS = {
  STANDBY: '#3b82f6',
  RESPONDING: '#f59e0b',
};

export const EVENT_TYPE_COLORS = {
  SUPPLY: '#3b82f6',
  DEMAND: '#ef4444',
};

// DVFS scaling
export const DVFS_MIN = 0.40;  // 40% minimum power
export const DVFS_MAX = 1.00;  // 100% max power
export const DVFS_RESPONSE_MS = 100; // response time

// GPU Rack configuration (Buffalo AI Hub)
export const COMMITTED_RACKS = 10;
export const FLEXIBLE_RACKS = 5;
export const TOTAL_RACKS = COMMITTED_RACKS + FLEXIBLE_RACKS;

// Power (MW) — Buffalo AI Hub
export const TOTAL_CAPACITY_MW = 50;
export const COMMITTED_MW = 35;
export const FLEXIBLE_MW = 15;

// Revenue rates
export const CAPACITY_PAYMENT_PER_DAY = 1200;    // $/day for enrollment
export const RESPONSE_EVENT_RATE = 85;            // $ per event
export const REGULATION_RATE_PER_SEC = 0.08;      // $ per second during response

// Risk levels
export const RISK = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

export const RISK_COLORS = {
  HIGH: '#f97316',
  MEDIUM: '#3b82f6',
  LOW: '#67e8f9',
};
