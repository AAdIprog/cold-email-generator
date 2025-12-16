import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Add interceptors later for Auth
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const emailService = {
    generate: async (data: any) => {
        // For now we don't assume auth is strictly enforced on this endpoint 
        // unless we updated the backend route. 
        // In step 137, I added 'authenticateToken' middleware to the route.
        // So we DO need a token.
        // HOWEVER, for smooth UX right now without forcing login immediately in dev flow,
        // I might want to temporarily bypass auth OR implementing login first.
        // BUT the prompt says "User can sign up and log in".

        // Let's implement Login Page quickly OR mocked token?
        // User asked "have you started frontend".

        // To make sure the generator works IMMEDIATELY for the user to see, 
        // I will temporarily make the backend route PUBLIC in `email.routes.ts` 
        // OR just use a hardcoded helper for now. 

        // Actually, following the "Mock Mode" pivot, let's keep it simple.
        // I will implement a quick LOGIN page next.
        // For now, let's write the service call assuming token exists.
        return api.post('/emails/generate', data);
    }
};

export const authService = {
    login: async (email: string, password: string) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        return res.data;
    },
    register: async (email: string, password: string) => {
        const res = await api.post('/auth/register', { email, password });
        localStorage.setItem('token', res.data.token);
        return res.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    }
}

export default api;
