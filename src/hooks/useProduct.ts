import type {Products } from "@/types/product";
import { axiosInstance } from "@/api/anime-api";
const token = localStorage.getItem("token");



export const getProductList = async () => {
    const response = await axiosInstance.get<Products[]>("/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
    return response.data
}