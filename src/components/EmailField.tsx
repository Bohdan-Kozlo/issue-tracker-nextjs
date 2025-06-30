const EmailField = ({
  isPending,
  error,
}: {
  isPending: boolean;
  error?: string[];
}) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
        placeholder="Enter your email"
        disabled={isPending}
      />
      {error && error.length > 0 && (
        <p className="mt-2 text-sm text-red-400 animate-fade-in">
          {error.join(", ")}
        </p>
      )}
    </div>
  );
};

export default EmailField;
