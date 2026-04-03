// Grid frequency thresholds (Hz)
export const FREQ_NOMINAL = 60.0;
export const FREQ_HIGH = 60.02;
export const FREQ_LOW = 59.98;
export const FREQ_CRITICAL = 59.95;

// Simulation
export const TICK_MS = 1000;
export const HISTORY_LENGTH = 120; // 2 minutes of data
export const TRIGGER_MAGNITUDE = 0.06;
export const TRIGGER_DECAY = 8; // seconds to recover

// Status definitions
export const STATUS = {
  ABSORBING: 'ABSORBING',
  NOMINAL: 'NOMINAL',
  CURTAILING: 'CURTAILING',
  SHEDDING: 'SHEDDING',
};

export const STATUS_COLORS = {
  ABSORBING: '#3b82f6',
  NOMINAL: '#22c55e',
  CURTAILING: '#f59e0b',
  SHEDDING: '#ef4444',
};

// Earnings
export const MINING_REVENUE_PER_SEC = 0.15; // $ per second base
export const GRID_SERVICE_PER_MW_SEC = 0.45; // $ per MW curtailed per second

// Battery
export const BATTERY_INITIAL = 92;
export const BATTERY_DRAIN_CURTAILING = 0.5; // % per second
export const BATTERY_DRAIN_SHEDDING = 1.5;
export const BATTERY_RECHARGE = 0.3;
export const BATTERY_MIN = 15;
export const BATTERY_MAX = 98;
