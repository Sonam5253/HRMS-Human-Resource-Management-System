import { useState } from "react";
import * as api from "../services/designationService";

export default function useDesignation() {
  const [loading, setLoading] = useState(false);

  const createDesignationHandler = async (data) => {
    try {
      setLoading(true);
      const res = await api.createDesignation(data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    } finally {
      setLoading(false);
    }
  };

  return { createDesignationHandler, loading };
}