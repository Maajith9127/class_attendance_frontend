
// import { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import axios from "axios";

// export default function TeacherDashboard() {
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const [qrCode, setQrCode] = useState("");
//   const [attendanceList, setAttendanceList] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   // Start Attendance (Generate QR & Notify Backend)
//   const handleStartAttendance = async () => {
//     try {
//       const code = Math.random().toString(36).substring(2, 10); // random QR
//       setQrCode(code);

//       const res = await axios.post(`${BASE_URL}/api/attendance/start`, {
//         qrCode: code,
//       });

//       console.log("Backend Response:", res.data);
//       setIsActive(true);
//       alert("✅ Attendance session started!");
//     } catch (err) {
//       console.error("Error starting attendance:", err);
//       alert("❌ Failed to start attendance session");
//     }
//   };

//   // Stop Attendance Session
//   const handleStopAttendance = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/attendance/stop`);
//       setQrCode("");
//       setIsActive(false);
//       alert("🛑 Attendance session stopped!");
//     } catch (err) {
//       console.error("Error stopping attendance:", err);
//     }
//   };

//   // Fetch All Attendance Records by Date
//   const handleDateChange = async (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);

//     if (!date) return;

//     try {
//       const res = await axios.get(`${BASE_URL}/api/attendance/all/${date}`);
//       console.log("Attendance records:", res.data);

//       // Format data for display
//       const formatted = res.data.data.map((r) => ({
//         name: r.userId, // replace with actual name when user model is integrated
//         studentId: r.userId,
//         status: r.status,
//       }));

//       setAttendanceList(formatted);
//     } catch (err) {
//       console.error("Error fetching all attendance:", err);
//       setAttendanceList([]);
//       alert("❌ No records found for this date");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">📋 Teacher Dashboard</h1>
//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       {/* QR Code Section */}
//       <div className="flex flex-col items-center mb-8">
//         {!isActive ? (
//           <button
//             onClick={handleStartAttendance}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md mb-4"
//           >
//             Start Attendance
//           </button>
//         ) : (
//           <button
//             onClick={handleStopAttendance}
//             className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md mb-4"
//           >
//             Stop Attendance
//           </button>
//         )}

//         {qrCode && (
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <QRCodeCanvas value={qrCode} size={200} />
//             <p className="mt-3 text-center text-gray-700 font-medium">
//               QR Code Active: <span className="text-blue-600">{qrCode}</span>
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Attendance Records Section */}
//       <div className="bg-white shadow-lg p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Attendance Records</h2>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         {attendanceList.length > 0 ? (
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Student ID</th>
//                 <th className="border p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceList.map((s, i) => (
//                 <tr key={i}>
//                   <td className="border p-2">{s.studentId}</td>
//                   <td
//                     className={`border p-2 font-semibold ${
//                       s.status === "Present"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {s.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-500 text-center">No records to show</p>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

export default function TeacherDashboard() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [qrCode, setQrCode] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isActive, setIsActive] = useState(false);

  // ✅ Start Attendance (Generate QR & Notify Backend)
  const handleStartAttendance = async () => {
    try {
      const code = Math.random().toString(36).substring(2, 10); // random QR
      setQrCode(code);

      const res = await axios.post(`${BASE_URL}/api/attendance/start`, {
        qrCode: code,
      });

      console.log("Backend Response:", res.data);
      setIsActive(true);
      alert("✅ Attendance session started!");
    } catch (err) {
      console.error("Error starting attendance:", err);
      alert("❌ Failed to start attendance session");
    }
  };

  // ✅ Stop Attendance Session
  const handleStopAttendance = async () => {
    try {
      await axios.post(`${BASE_URL}/api/attendance/stop`);
      setQrCode("");
      setIsActive(false);
      alert("🛑 Attendance session stopped!");
    } catch (err) {
      console.error("Error stopping attendance:", err);
    }
  };

  // ✅ Fetch All Attendance Records by Date
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (!date) return;

    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/all/${date}`);
      console.log("Attendance records:", res.data);

      // use email from backend response
      const formatted = res.data.data.map((r) => ({
        email: r.email,
        status: r.status,
      }));

      setAttendanceList(formatted);
    } catch (err) {
      console.error("Error fetching all attendance:", err);
      setAttendanceList([]);
      alert("❌ No records found for this date");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📋 Teacher Dashboard
        </h1>
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

      {/* QR Code Section */}
      <div className="flex flex-col items-center mb-8">
        {!isActive ? (
          <button
            onClick={handleStartAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md mb-4"
          >
            Start Attendance
          </button>
        ) : (
          <button
            onClick={handleStopAttendance}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md mb-4"
          >
            Stop Attendance
          </button>
        )}

        {qrCode && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <QRCodeCanvas value={qrCode} size={200} />
            <p className="mt-3 text-center text-gray-700 font-medium">
              QR Code Active: <span className="text-blue-600">{qrCode}</span>
            </p>
          </div>
        )}
      </div>

      {/* Attendance Records Section */}
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
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
                <th className="border p-2">Student Email</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((s, i) => (
                <tr key={i}>
                  <td className="border p-2">{s.email}</td>
                  <td
                    className={`border p-2 font-semibold ${
                      s.status === "Present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No records to show</p>
        )}
      </div>
    </div>
  );
}
