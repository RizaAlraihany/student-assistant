import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
  </div>
);

export default Input;
