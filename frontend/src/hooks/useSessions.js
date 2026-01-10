import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sessionApi } from '../api/sessions';

export const useActiveSessions= ()=>{
    const result = useQuery({
        queryKey: ['activeSessions'],
        queryFn: sessionApi.getActiveSessions,
    })
    return result;
}

export const useCreateSession= ()=>{
    const result = useMutation({
        mutationFn: sessionApi.createSession,
        onSuccess: ()=> toast.success("Session Created Successfully"),
        onError: (error)=> toast.error(error?.response?.data?.message || "Failed to create session"),
    })
    return result;
}

export const useRecentSessions= ()=>{
    const result = useQuery({
        queryKey: ['recentSessions'],
        queryFn: sessionApi.getRecentSessions,
    })
    return result;
}

export const useSessionById= (id)=>{
    const result = useQuery({
        queryKey: ['session'],
        queryFn: ()=> sessionApi.getSessionbyId(id),
        enabled: !!id,
        refetchInterval: 5000,
    })
    return result;
}
export const useJoinSession= (id)=>{
    const result = useMutation({
        mutationFn: ()=> sessionApi.joinSession(id),
        onSuccess: ()=> toast.success("Joined Session Successfully"),
        onError: (error)=> toast.error(error?.response?.data?.message || "Failed to join session"),
    })
    return result;
}
export const useEndSession= (id)=>{
    const result = useMutation({
        mutationFn: ()=> sessionApi.endSession(id),
        onSuccess: ()=> toast.success("Ended Session Successfully"),
        onError: (error)=> toast.error(error?.response?.data?.message || "Failed to end session"),
    })
    return result;
}