import { useState } from "react";
import fingerprintService from "../api/services/fingerprint.service";

export const useFingerprint = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const embedFingerprint = async (data) => {
    try {
      setLoading(true);
      const result = await fingerprintService.embedFingerprint(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const decodeFingerprint = async (data) => {
    try {
      setLoading(true);
      const result = await fingerprintService.decodeFingerprint(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    embedFingerprint,
    decodeFingerprint,
    loading,
    error,
  };
};
