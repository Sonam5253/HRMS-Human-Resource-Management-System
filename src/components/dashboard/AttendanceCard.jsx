import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bell, LogIn, LogOut, Coffee } from "lucide-react";

import Card from "../../components/commons/Card";
import Button from "../../components/commons/Button";
import Avatar from "../../components/commons/Avatar";

export default function AttendanceCard() {
    const [time, setTime] = useState(new Date());
    const [status, setStatus] = useState("not_started");

    // ✅ USER DATA
    const reduxUser = useSelector((state) => state.auth.user);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = reduxUser || storedUser;

    // ⏱️ Clock
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = time.toLocaleTimeString("en-GB");
    const formatDate = time.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // Greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    // Actions
    const handlePunchIn = () => setStatus("active");
    const handleBreak = () =>
        setStatus((prev) => (prev === "break" ? "active" : "break"));
    const handlePunchOut = () => setStatus("ended");

    return (
        <Card className="p-4 h-[340px] flex flex-col justify-between rounded-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <Avatar
                        letter={user?.name?.charAt(0) || "U"}
                        size="lg"
                    />

                    <div>
                        <p className="text-sm font-semibold text-slate-800">
                            {getGreeting()}, {user?.name || "User"} 👋
                        </p>

                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            {user?.role || "Employee"}
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        </p>

                        <p className="text-[11px] text-slate-400">
                            Development Team
                        </p>
                    </div>
                </div>

                {/* Bell */}
                <div className="relative">

                </div>
            </div>

            {/* TITLE */}
            <div className="flex items-center justify-between mt-2">
                <h2 className="text-sm font-semibold text-slate-700">
                    Today's Attendance
                </h2>

                <span className={`px-4 py-1 rounded-full text-xs font-medium
          ${status === "active"
                        ? "bg-green-100 text-green-700"
                        : status === "break"
                            ? "bg-amber-100 text-amber-700"
                            : status === "ended"
                                ? "bg-slate-200 text-slate-600"
                                : "bg-gray-100 text-gray-600"
                    }`}
                >
                    {status === "active"
                        ? "Active"
                        : status === "break"
                            ? "On Break"
                            : status === "ended"
                                ? "Shift Ended"
                                : "Not Started"}
                </span>
            </div>

            {/* TIME */}
            <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Current Time</p>
                <h1 className="text-4xl font-bold text-slate-900">
                    {formatTime}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    {formatDate}
                </p>
            </div>


            <div className="grid grid-cols-3 gap-3 ">

                {/* Punch In */}
                <Button
                    size="lg"
                    variant="success"
                    onClick={handlePunchIn}
                    className="flex flex-col items-center justify-center gap-1 py-3"
                >
                    <LogIn size={20} />
                    <span className="text-[12px]">Punch In</span>
                </Button>

                {/* Break */}
                <Button
                    size="lg"
                    variant="white"
                    onClick={handleBreak}
                    className="flex flex-col items-center justify-center gap-1 py-3 !bg-[#F59E0B] hover:!bg-[#D97706] !text-white"
                >
                    <Coffee size={20} />
                    <span className="text-[12px]">
                        {status === "break" ? "End Break" : "Take Break"}
                    </span>
                </Button>

                {/* Punch Out */}
                <Button
                    size="lg"
                    onClick={handlePunchOut}
                    className="flex flex-col items-center justify-center gap-1 py-3 bg-slate-800 hover:bg-slate-900 text-white"
                >
                    <LogOut size={20} />
                    <span className="text-[12px]">Punch Out</span>
                </Button>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs mt-2">
                <div className="bg-slate-100 rounded-lg p-2">
                    <p className="text-slate-500">Shift Start</p>
                    <p className="font-semibold text-green-600 mt-1">9:00 AM</p>
                </div>

                <div className="bg-slate-100 rounded-lg p-2">
                    <p className="text-slate-500">Hours Today</p>
                    <p className="font-semibold text-blue-600 mt-1">4h 41m</p>
                </div>

                <div className="bg-slate-100 rounded-lg p-2">
                    <p className="text-slate-500">Break Used</p>
                    <p className="font-semibold text-amber-500 mt-1">0m</p>
                </div>
            </div>

        </Card>
    );
}