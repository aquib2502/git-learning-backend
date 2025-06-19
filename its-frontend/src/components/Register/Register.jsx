"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const router = useRouter();

  useEffect(() =>{
    fetchUsers()
  }, [])

      const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/user/fetch");
        console.log(response.data);
    }

  const handleSubmit = async (e) => {
    e.preventDefault();  // ✅ Corrected

    const userData = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        userData,  // ✅ No wrapping object
        {
          headers: {
            "Content-Type": "application/json",  // ✅ Correct header
          },
        }
      );
       console.log(response.data);
      alert("User registered successfully!");
        router.push("/login");  // Redirect to login page after successful registration
     
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
     
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
