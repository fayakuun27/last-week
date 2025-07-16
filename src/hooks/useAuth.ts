import { axiosInstance } from "@/api/anime-api";
import type { User } from "@/types/auth";

export const getProductList = async () => {
    const response = await axiosInstance.post<User>("/auth/login");

    
    return response.data
}