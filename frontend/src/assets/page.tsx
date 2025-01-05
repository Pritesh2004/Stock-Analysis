"use client";

import { auth, db } from "@/lib/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ("use server");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await createUserWithEmailAndPassword(email, password);

    if (result) {
      const user = result?.user;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          email: email,
          uid: user.uid,
        });
        router.push("/");
      }
    } else {
      switch (error?.code) {
        case "auth/invalid-email":
          setFormError("Please provide a valid email address.");
          break;
        case "auth/email-already-in-use":
          setFormError(
            "The email address is already in use by another account."
          );
          break;
        case "auth/weak-password":
          setFormError("The password must be at least 6 characters long.");
          break;
        default:
          setFormError(error?.message || "An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex-1 flex flex-col justify-center 
      items-center px-4 md:px-8 bg-white"
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo img"
            width={276}
            height={85}
            quality={95}
            priority
          />
        </Link>
        <div className="mb-8 text-center mt-14">
          <p className="text-3xl font-extrabold">Register now</p>
          <p className="text-xl font-semibold text-gray-400 mt-3">
            Discover the power of Soft Stocks!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <label htmlFor="email" className="flex flex-col font-bold">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              pattern="[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"
              title="Please enter a valid email address"
              className="mt-1 p-3 border border-gray-300 rounded-md
              font-medium outline-none focus:border-primary"
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col font-bold relative"
          >
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="mt-1 w-full p-3 border border-gray-300 
                rounded-md pr-10 font-medium outline-none focus:border-primary"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center 
                pr-3 cursor-pointer"
                onClick={() => toggleShowPassword()}
              >
                {showPassword ? (
                  <FaRegEye size={22} className="text-primary" />
                ) : (
                  <FaRegEyeSlash size={22} className="text-slate-400" />
                )}
              </div>
            </div>
          </label>
          {formError && <p className="text-red-500">{formError}</p>}
          <button
            type="submit"
            className={`${
              error && "mt-0"
            } mt-4 px-4 py-3 font-semibold text-white bg-gradient-to-r 
        from-primary to-primary_light rounded-md hover:opacity-90`}
          >
            Sign up
          </button>
        </form>
        <div className="mt-4">
          <p className="font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1">
        <Image
          src="/signUp.jpg"
          alt="Sign In"
          width={2000}
          height={1500}
          quality={95}
          priority
          className="object-cover rounded-l-[50px]"
        />
      </div>
    </div>
  );
};

export default Register;
