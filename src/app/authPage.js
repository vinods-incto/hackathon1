"use client";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setErrors({});
    setFormData({ name: "", email: "", password: "" });
    setIsLogin(!isLogin);
  };
const routeToChandu = ()=>{
    router.push("/chandu")
}
const routeToDashboard = ()=>{
    router.push("/dashboard")
}
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";}
    //  else if (   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/i.test(formData.password)) {
    //   newErrors.password = "Password allows only 8-15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character and special characters are @,$,!,%,*,?,&";
    // }
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
      // const res = await fetch("http://localhost:8081/login",{
      //     method: "POST",
      //     headers: {"Content-Type": "application/json"},
      //     body: JSON.stringify({
      //         email: formData.email,
      //         password: formData.password
      //     })
      // })

    // if(res.ok){
    //     const data = await res.json();
    //     if (data.success && data.token) {
    //         localStorage.setItem("jwtToken",data.token);
    //         setIsLogin(true)
    //     } else {
    //         setErrors({ password: "Invalid email or password" });
    //         return;
    //     }
    //
    // } else{
    //     setErrors({ password: "Invalid email or password" });
    //     return;
    // }

    if (isLogin) {

      if (
        formData.email === "testdashboard@gmail.com" &&
        formData.password === "Test@123"
      ) {
        setLoading(true);
        router.push("/chandu");
        return;
      } else {
        setErrors({ password: "Invalid email or password" });
        return;
      }
    }

    setErrors({});
    console.log("Form submitted:", formData);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4 py-12 overflow-hidden">
      {/* Mixed Chart Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
      >
        {/* Bar Chart */}
        {[...Array(12)].map((_, i) => {
          const height = 40 + Math.sin(i * 1.3) * 30;
          return (
            <rect
              key={`bar1-${i}`}
              x={i * 65 + 20}
              y={400 - height}
              width="40"
              height={height}
              fill="#3b82f6"
              style={{
                animation: `barGrow 2s ease-in-out ${
                  i * 0.15
                }s infinite alternate`,
              }}
            />
          );
        })}

        {/* Overlay Line Chart */}
        <polyline
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="30,250 90,220 150,260 210,210 270,230 330,190 390,210 450,180 510,200 570,160 630,190 690,150"
          style={{ animation: "lineWave 4s ease-in-out infinite alternate" }}
        />

        {/* Scatter Dots */}
        {[...Array(10)].map((_, i) => (
          <circle
            key={`dot-${i}`}
            cx={40 + i * 70}
            cy={200 + (i % 2 === 0 ? -20 : 20)}
            r="6"
            fill="#93c5fd"
            style={{
              animation: `dotPulse 3s ease-in-out ${
                i * 0.3
              }s infinite alternate`,
            }}
          />
        ))}

        <style jsx>{`
          @keyframes barGrow {
            0% {
              transform: scaleY(0.5);
            }
            100% {
              transform: scaleY(1);
            }
          }

          @keyframes lineWave {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-10px);
            }
          }

          @keyframes dotPulse {
            0% {
              opacity: 0.5;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1.1);
            }
          }

          rect {
            transform-origin: center bottom;
            transform-box: fill-box;
          }
        `}</style>
      </svg>

      {/* Glassmorphic Form Container */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/20 z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-6">
          {isLogin ? "Login to Dashboard" : "Create Your Account"}
        </h2>

          <button
              onClick={routeToChandu}
              className="text-blue-400 hover:underline cursor-pointer float-left"
          >
              Demo Dashboard 1
          </button>
          <button
              onClick={routeToDashboard}
              className="text-blue-400 hover:underline cursor-pointer float-right"
          >
              Demo Dashboard 2
          </button>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-white/80 mt-6 ">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>



      </div>
    </div>
  );
}
