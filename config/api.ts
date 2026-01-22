import dotenv from 'dotenv';

export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api/v1',
    TIMEOUT: 10000,
};

export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
