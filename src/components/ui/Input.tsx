import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightAdornment?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  rightAdornment,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm text-slate-400 mb-2 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-violet-500 outline-none transition disabled:opacity-50 ${className}`}
          {...props}
        />
        {rightAdornment && (
          <span className="absolute right-4 top-3.5 text-slate-500 text-sm font-bold">
            {rightAdornment}
          </span>
        )}
      </div>
    </div>
  );
};
