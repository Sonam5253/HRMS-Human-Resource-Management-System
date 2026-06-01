
import { useEffect, useState } from "react";
import {
  checkIn,
  checkOut,
  startBreak,
  endBreak,
  getAttendanceSummary,
} from "../services/attendanceApi";

export default function useAttendance() {
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [working, setWorking] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const fetchAttendance = async () => {
    try {
      const response = await getAttendanceSummary();
      setAttendance(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const response = await checkIn();

      setWorking(true);

      setAttendance((prev) => ({
        ...prev,
        checkInTime: response.data.checkInTime,
        status: response.data.status,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const response = await checkOut();

      setWorking(false);
      setOnBreak(false);

      setAttendance((prev) => ({
        ...prev,
        checkOutTime: response.data.checkOutTime,
        totalWorkingHours: response.data.totalWorkingHours,
        overtime: response.data.overtime,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleBreakStart = async () => {
    await startBreak();
    setOnBreak(true);
  };

  const handleBreakEnd = async () => {
    await endBreak();
    setOnBreak(false);
  };

  return {
    attendance,
    working,
    onBreak,
    loading,
    handleCheckIn,
    handleCheckOut,
    handleBreakStart,
    handleBreakEnd,
    refreshAttendance: fetchAttendance,
  };
}
