import axios, { AxiosInstance } from 'axios';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async submitForm(email: string, additionalInfo: string) {
        try {
            const response = await this.api.post('/ux-insights', { email, additionalInfo });
            return response.data;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }
}

export default new ApiService();
