"use client";

import PasswordField from "@/components/PasswordField";
import EmailField from "@/components/EmailField";
import GoogleReg from "@/components/GoogleReg";
import AuthLayout from "@/components/AuthLayout";
import { ActionResponse } from "@/lib/types";
import { useActionState } from "react";
import { register } from "@/app/server-actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function RegisterPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    const response = await register(formData);

    if (response.success) {
      toast.success(response.message);
      router.push("/dashboard");
    } else {
      toast.error(response.message);
    }

    return response;
  }, initialState);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Issue Tracker today"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      {state.message && (
        <div className="mb-4 text-center text-red-400 font-medium animate-fade-in">
          {state.message}
        </div>
      )}
      <form className="space-y-6" action={formAction}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
            placeholder="Enter your username"
            disabled={isPending}
          />
          {state.errors?.username && (
            <p className="mt-2 text-sm text-red-400 animate-fade-in">
              {state.errors.username}
            </p>
          )}
        </div>
        <EmailField isPending={isPending} error={state.errors?.email} />
        <PasswordField isPending={isPending} error={state.errors?.password} />
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-semibold shadow-lg hover:shadow-[#ff6600]/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          Create Account
        </button>
      </form>
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-white/20"></div>
        <span className="px-4 text-sm text-gray-400">or</span>
        <div className="flex-1 border-t border-white/20"></div>
      </div>
      <GoogleReg />
    </AuthLayout>
  );
}
