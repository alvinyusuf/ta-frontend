import { getAxiosInstance } from "../axiosInstance";

const generatorService = {
    generateImage: async (imageData) => {
        try {
            const response = await getAxiosInstance.post("generator/generate", imageData);
            return response.data;
        } catch (error) {
            console.error("Error generating image:", error);
            throw error;
        }
    },
}

export default generatorService;