// @ts-ignore
"use client"
import {useState} from "react";
import {account} from "@/appwrite";
import {useRouter} from "next/navigation";

export default function SignInPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e:any) => {
        e.preventDefault();
        try{
            const response = await account.createEmailSession(email, password);
            console.log(response);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={handleSignIn}
                    >
                        Sign in
                    </button>
                </form>
                <div className="my-6 text-center text-gray-600">Or</div>
                <button
                    className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    // onClick={loginWithGoogle}
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    Sign in with Google
                </button>

                <p className="mt-6 text-gray-600 text-center">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Don't have an account?
                    <span
                        className="text-blue-500 cursor-pointer"
                        // onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    )
}