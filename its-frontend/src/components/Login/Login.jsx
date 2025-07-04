'use client'
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");

  try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
          },
        }
      );

      console.log("Login success:", response.data);
      alert("Login successful!");
      localStorage.setItem("userToken", response.data.token)
      router.push('/contactus')
      // You can save token or redirect here
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
               value={email}
            onChange={e =>{ setEmail(e.target.value)}}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          
      
        </form>
      </div>
    </div>
  );
}

export default Login;
