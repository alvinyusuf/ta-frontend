import axiosInstance from "../axiosInstance";

const fingerprintService = {
    embedFingerprint: async (fingerprintData) => {
        try {
            const response = await axiosInstance.post("fingerprint/embed", fingerprintData);
            return response.data;
        } catch (error) {
            console.error("Error embedding fingerprint:", error);
            throw error;
        }
    },
    decodeFingerprint: async (fingerprintData) => {
        try {
            const response = await axiosInstance.post("fingerprint/decode", fingerprintData);
            return response.data;
        } catch (error) {
            console.error("Error decoding fingerprint:", error);
            throw error;
        }
    },
}

export default fingerprintService;