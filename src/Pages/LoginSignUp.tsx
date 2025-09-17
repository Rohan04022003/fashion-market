import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // <-- add useNavigate

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // <-- initialize navigate

    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-2">
            <Card className="w-full max-w-md rounded-[5px] border">
                <CardHeader className="text-center space-y-4">
                    {/* Website Logo */}
                    <div className="flex justify-center">
                        <Link to="/" className="font-bold text-lg flex flex-col items-center">
                            <h1 className="mb-[-.3rem] cedarville-cursive-regular">
                                Fashion <span className="text-orange-500">Market</span>
                            </h1>
                            <p className="text-[.7rem] text-gray-500 font-normal">Wear Your Vibe.</p>
                        </Link>
                    </div>

                    {/* Tab Buttons */}
                    <div className="mt-2 mb-5 flex justify-center gap-4">
                        <Button
                            variant={isLogin ? "default" : "outline"}
                            onClick={() => setIsLogin(true)}
                            className={`rounded-[5px] px-6 ${isLogin ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                        >
                            Login
                        </Button>
                        <Button
                            variant={!isLogin ? "default" : "outline"}
                            onClick={() => setIsLogin(false)}
                            className={`rounded-[5px] px-6 ${!isLogin ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                        >
                            Signup
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5 px-6 pb-6">
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="e.g. John Doe" className="rounded-[5px]" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" className="rounded-[5px]" />
                    </div>

                    <div className="space-y-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10 placeholder:text-gray-500 rounded-[5px]"
                        />
                        <span
                            className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={togglePassword}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>

                    <Button className="w-full flex items-center justify-center gap-2 mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-[5px]">
                        {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                        {isLogin ? "Log In" : "Sign Up"}
                    </Button>

                    <div className="text-center text-sm text-gray-600 mt-2">
                        {isLogin ? (
                            <>
                                Don’t have an account?{" "}
                                <span
                                    className="text-orange-600 hover:underline cursor-pointer"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Sign up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span
                                    className="text-orange-600 hover:underline cursor-pointer"
                                    onClick={() => setIsLogin(true)}
                                >
                                    Log in
                                </span>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* 👇 Go Back Button */}
            <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="mt-4 text-sm rounded-[5px] flex gap-2 items-center"
            >
                <ArrowLeft size={16} />
                Go Back
            </Button>
        </div>
    );
};

export default LoginSignup;
