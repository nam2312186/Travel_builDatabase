// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Other configurations
export const APP_NAME = 'Viet Travel';
export const APP_VERSION = '1.0.0';

// Timeout settings
export const API_TIMEOUT = 30000; // 30 seconds

console.log('🌐 API Base URL:', API_BASE_URL);