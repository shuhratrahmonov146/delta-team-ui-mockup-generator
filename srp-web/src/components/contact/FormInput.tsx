import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  touched?: boolean;
  errorText?: string;
}

export function FormInput({
  label,
  touched,
  errorText,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="font-semibold text-sm">{label}</label>
      <div className="relative">
        <input
          {...props}
          className={`peer w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition-all
          data-[touched=true]:invalid:border-red-500 data-[touched=true]:invalid:text-red-600 data-[touched=true]:invalid:focus:ring-red-500
          data-[touched=true]:valid:border-green-500 data-[touched=true]:valid:focus:ring-green-500 ${className}`}
          data-touched={touched}
        />
        {errorText && (
          <p className="hidden peer-data-[touched=true]:peer-invalid:block text-red-500 text-xs mt-1">
            {errorText}
          </p>
        )}
      </div>
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  touched?: boolean;
  errorText?: string;
}

export function FormTextarea({
  label,
  touched,
  errorText,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label className="font-semibold text-sm">{label}</label>
      <div className="relative">
        <textarea
          {...props}
          className={`peer w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-900 placeholder-gray-400 resize-none transition-all
          data-[touched=true]:invalid:border-red-500 data-[touched=true]:invalid:text-red-600 data-[touched=true]:invalid:focus:ring-red-500
          data-[touched=true]:valid:border-green-500 data-[touched=true]:valid:focus:ring-green-500 ${className}`}
          data-touched={touched}
        />
        {errorText && (
          <p className="hidden peer-data-[touched=true]:peer-invalid:block text-red-500 text-xs mt-1">
            {errorText}
          </p>
        )}
      </div>
    </div>
  );
}
