import axiosInstance from "../lib/axios.js";
import axios from "../lib/axios.js";

export const sessionApi= {
    createSession: async (data)=>{
        const response=await axiosInstance.post("/sessions", data);
        return response.data;    
    },

    getActiveSessions: async()=>{
        const response=await axiosInstance.get("/sessions/active");
        return response.data;

    },
    getRecentSessions: async()=>{
        const response=await axiosInstance.get("/sessions/past-sessions");
        return response.data;

    },
    getSessionbyId: async(id)=>{
        const response=await axiosInstance.get(`/sessions/${id}`);
        return response.data;

    },
    joinSession: async(id)=>{
        const response=await axiosInstance.post(`/sessions/${id}/join`);
        return response.data;

    },
    endSession: async(id)=>{
        const response=await axiosInstance.post(`/sessions/${id}/end`);
        return response.data;

    },
    getstreamtoken: async()=>{
        const response=await axiosInstance.get("chat/token");
        return response.data;

    },

}