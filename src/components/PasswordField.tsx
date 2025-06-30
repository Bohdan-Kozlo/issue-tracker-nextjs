const PasswordField = ({
  isPending,
  error,
}: {
  isPending: boolean;
  error?: string[];
}) => {
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
        placeholder="Create a strong password"
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

export default PasswordField;
