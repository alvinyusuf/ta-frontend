import { useState } from "react";
import generatorService from "../api/services/generator.service";

export const useGenerator = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateImage = async (imageData) => {
    try {
      setLoading(true);
      const result = await generatorService.generateImage(imageData);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const getModels = async () => {
    try {
      setLoading(true);
      const result = await generatorService.getModels();
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    generateImage,
    getModels,
    loading,
    error,
  };

};
