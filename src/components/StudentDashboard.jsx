



import { useState, useRef } from "react";
import QrReader from "@uides/react-qr-reader";
import axios from "axios";

export default function StudentDashboard() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  clog("API Base URL:", BASE_URL);

  const [scanResult, setScanResult] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const hasScanned = useRef(false); // prevents multiple triggers

  // Auto QR Detection Handler
  const handleScan = async (data) => {
    if (data && !hasScanned.current) {
      hasScanned.current = true;
      setScanResult(data);
      setAttendanceStatus("📸 QR detected...");

      const userId = localStorage.getItem("userId");

      try {
        const res = await axios.post(`${BASE_URL}/api/attendance/mark`, {
          userId,
          scannedCode: data,
        });

        setAttendanceStatus("✅ " + res.data.message);
        console.log("Attendance response:", res.data);
      } catch (err) {
        console.error("Error marking attendance:", err);
        setAttendanceStatus(
          "❌ " + (err.response?.data?.message || "Server error")
        );
      } finally {
        // allow next scan after delay
        setTimeout(() => (hasScanned.current = false), 2000);
      }
    }
  };

  const handleError = (err) => console.error("QR Error:", err);

  // Fetch attendance from backend when user selects date
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/${userId}/${date}`);
      console.log("Attendance record:", res.data);

      setAttendanceList([res.data.data]);
      setAttendanceStatus("✅ Attendance record found");
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setAttendanceList([]);
      setAttendanceStatus("❌ No record found for this date");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🎓 Student Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* QR Scanner Section */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-4">Scan Today's QR Code</h2>

        <div className="border-4 border-blue-600 rounded-lg overflow-hidden w-[300px] h-[300px]">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {scanResult && (
          <p className="mt-4 text-gray-700 font-medium">
            Scanned Code: <span className="text-blue-600">{scanResult}</span>
          </p>
        )}
        {attendanceStatus && (
          <p className="mt-2 font-semibold">{attendanceStatus}</p>
        )}
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Check Attendance</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 rounded"
          />
        </div>

        {attendanceList.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((r, i) => (
                <tr key={i}>
                  <td className="border p-2">{r.date}</td>
                  <td
                    className={`border p-2 font-semibold ${
                      r.status === "Present" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">
            No record for selected date
          </p>
        )}
      </div>
    </div>
  );
}
