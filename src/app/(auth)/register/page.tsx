"use client";

import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RegisterResponse } from "@/types";


const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one lowercase letter, one uppercase letter, and one number."
        ),
});


type FormData = z.infer<typeof schema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const router = useRouter();


    const { mutate, isPending } = useMutation<RegisterResponse, Error, FormData>({
        mutationFn: (data) => apiFetch<RegisterResponse>("/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),
        onSuccess: () => {
            toast.success("Account created successfully!, will redirect to login page");
            router.push("/login");
        },
    });

    const onSubmit = (data: FormData) => mutate(data);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-semibold text-3xl">Create new account</h1>
                <p className="text-gray-500 mt-2 text-base">
                    Welcome back! Please enter your details
                </p>
            </div>

            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block font-medium text-gray-800 mb-2">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        {...register("fullName")}
                        disabled={isPending}
                        className={`p-3 border rounded-2xl w-full outline-0 ${errors.fullName ? "border-red-500" : "border-gray-200"
                            } ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block font-medium text-gray-800 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="text@example.com"
                        {...register("email")}
                        disabled={isPending}
                        className={`p-3 border rounded-2xl w-full outline-0 ${errors.email ? "border-red-500" : "border-gray-200"
                            } ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block font-medium text-gray-800 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="******"
                        {...register("password")}
                        disabled={isPending}
                        className={`p-3 border rounded-2xl w-full outline-0 ${errors.password ? "border-red-500" : "border-gray-200"
                            } ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className={`
                    w-full rounded-2xl bg-[#C8EE44] font-semibold text-gray-800 py-3 flex justify-center items-center gap-x-2
                    ${isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B3D93D] transition-colors cursor-pointer"}
                `}
                >
                    {isPending && <FaSpinner className="animate-spin" />}
                    {isPending ? "Loading..." : "Create Account"}
                </button>

                {/* Google Login */}
                <button
                    type="button"
                    disabled={isPending}
                    className={`
                    w-full rounded-2xl border border-gray-200 font-semibold text-gray-500 py-3 flex items-center justify-center gap-x-3
                    ${isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 transition-colors cursor-pointer"}
                `}
                >
                    <FcGoogle className="text-2xl" />
                    Sign up with Google
                </button>

                <p className="text-gray-500 text-center">
                    Already have an account?
                    <Link href={"/login"} className="font-semibold text-black cursor-pointer mx-2 relative">
                        Sign in
                        <img
                            src="/vector.png"
                            alt=""
                            className="absolute left-1/2 -translate-x-1/2 -bottom-3"
                        />
                    </Link>
                </p>
            </form>
        </div>
    );
}