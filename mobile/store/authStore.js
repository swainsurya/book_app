import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { isLoaded } from "expo-font";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,  // Set default false

    register: async (username, email, password) => {
        set({ isLoading: true }); // Start loading

        try {
            console.log("Registering user...");
            const response = await fetch(
                "https://book-app-backend-gb31.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        username,
                        email,
                        password
                    })
                },
            );
            const data = await response.json();
            if(data?.status){
                alert(data.message)
                router.push("/(auth)")
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message); // Stop loading on failure
        }
        finally{
            set({ isLoading: false });
        }
    },
    login: async(email,password) => {
        set({isLoading: true});
        try {
            const response = await fetch(
                "https://book-app-backend-gb31.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        email,
                        password
                    })
                },
            );

            const data = await response.json();
            
            if(data?.status){
                alert(data.message)
                console.log(data);
                set({
                    token: data.token,
                    user: data.user
                })
                router.replace("/");
                await AsyncStorage.setItem("user", JSON.stringify(data));
                await AsyncStorage.setItem("token",data.token);

            }
            else {
                alert(data.message)
            }

        } catch (error) {
            
        }
        finally{
            set({isLoading: false})
        }
    }
}));
