"use client";

import AuthLayout from "@/components/AuthLayout";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import GoogleReg from "@/components/GoogleReg";
import { ActionResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { login } from "@/app/server-actions/auth";
import toast from "react-hot-toast";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function LoginPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    const response = await login(formData);

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
      title="Sign In"
      subtitle="Welcome back! Log in to your account."
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
      {state.message && (
        <div className="mb-4 text-center text-red-400 font-medium animate-fade-in">
          {state.message}
        </div>
      )}
      <form className="space-y-6" action={formAction}>
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
          Sign In
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
