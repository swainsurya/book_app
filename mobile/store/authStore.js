import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,  // Set default false

    register: async (username, email, password) => {
        set({ isLoading: true }); // Start loading

        try {
            console.log("Registering user...");
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                username,
                email,
                password
            });

            // Assuming API returns user and token
            set({
                user: response.data.user, 
                token: response.data.token,
                isLoading: false
            });

            console.log("Registration successful", response.data);
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            set({ isLoading: false }); // Stop loading on failure
        }
    }
}));
