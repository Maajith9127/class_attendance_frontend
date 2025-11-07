
// import { useState } from "react";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const [isSignup, setIsSignup] = useState(false);

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const url = isSignup
//       ? "http://localhost:5000/api/register"
//       : "http://localhost:5000/api/login";

//     const res = await axios.post(url, { email, password, role });

//     alert(res.data.message);

//     // Save login info locally
//     localStorage.setItem("userId", res.data.user._id);
//     localStorage.setItem("role", res.data.user.role);

//     if (res.data.user.role === "teacher") {
//       window.location.href = "/teacher";
//     } else {
//       window.location.href = "/student";
//     }
//   } catch (err) {
//     alert(" " + (err.response?.data?.message || "Server error"));
//   }
// };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg p-8 rounded-xl w-96">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           {isSignup ? "Create Account" : "Login"}
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />
//           {isSignup && (
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="border p-2 rounded"
//             >
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//             </select>
//           )}

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded"
//           >
//             {isSignup ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         <p
//           className="text-sm text-center mt-4 cursor-pointer text-blue-500 hover:underline"
//           onClick={() => setIsSignup(!isSignup)}
//         >
//           {isSignup
//             ? "Already have an account? Login"
//             : "Don't have an account? Sign up"}
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignup
        ? `${BASE_URL}/api/register`
        : `${BASE_URL}/api/login`;

      const res = await axios.post(url, { email, password, role });

      alert(res.data.message);

      // Save login info locally
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/student";
      }
    } catch (err) {
      alert(" " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          {isSignup && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p
          className="text-sm text-center mt-4 cursor-pointer text-blue-500 hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  );
}

