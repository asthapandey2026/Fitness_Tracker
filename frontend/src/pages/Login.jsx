import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/login", {
                email,
                password,
            });

            login(response.data.user, response.data.token);

            navigate("/dashboard");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-400">
                        FitTrack
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Track your workouts. Build your progress.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8">

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Welcome Back 👋
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        {message && (
                            <p className="text-red-500 text-sm">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Create one
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;