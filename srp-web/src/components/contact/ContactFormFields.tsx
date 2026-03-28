import { FormInput, FormTextarea } from "./FormInput";
import PhoneInput from "@/components/ui/PhoneInput";

interface ContactFormFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };
  touched: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    message: boolean;
  };
  phone: string;
  isSubmitting: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setPhone: (phone: string) => void;
}

export default function ContactFormFields({
  formData,
  touched,
  phone,
  isSubmitting,
  handleChange,
  handleBlur,
  setPhone,
}: ContactFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First name *"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.firstName}
          required
          minLength={2}
          placeholder="John"
          errorText="Please enter a valid first name (min 2 characters)."
        />
        <FormInput
          label="Last name *"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.lastName}
          required
          minLength={2}
          placeholder="Doe"
          errorText="Please enter a valid last name."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          placeholder="name@company.com"
          errorText="Please enter a valid email address."
        />
        <div className="space-y-2">
          <label className="font-semibold text-sm">Phone number</label>
          <div className="w-full">
            <PhoneInput value={phone} onChange={setPhone} />
          </div>
        </div>
      </div>

      <FormTextarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.message}
        required
        minLength={10}
        rows={5}
        placeholder="How can we help you?"
        errorText="Please enter your message (min 10 characters)."
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 bg-[#0f1035] text-white font-medium py-3.5 rounded-lg
          hover:bg-[#1283BB] active:scale-95 transition-all shadow-lg
          disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </div>
  );
}
