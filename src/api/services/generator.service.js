import { getAxiosInstance } from "../axiosInstance";

const generatorService = {
    generateImage: async (imageData) => {
        try {
            const response = await getAxiosInstance().post("generator/generate", imageData);
            return response.data;
        } catch (error) {
            console.error("Error generating image:", error);
            throw error;
        }
    },
    getModels: async () => {
        try {
            const response = await getAxiosInstance().get("generator/models");
            return response.data;
        } catch (error) {
            console.error("Error fetching models:", error);
            throw error;
        }
    }
}

export default generatorService;