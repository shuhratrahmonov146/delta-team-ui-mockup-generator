import Image from "next/image";

interface ContactSidebarProps {
  services: string[];
  selectedServices: string[];
  handleServiceChange: (service: string) => void;
}

export default function ContactSidebar({
  services,
  selectedServices,
  handleServiceChange,
}: ContactSidebarProps) {
  return (
    <div className="lg:col-span-4 flex flex-col justify-between h-full mt-4 lg:mt-0">
      <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 shadow-sm flex-1 mb-6 lg:mb-0 lg:max-h-[52.5%]">
        <h3 className="font-bold text-lg text-gray-900 mb-4">
          What are you interested in?
        </h3>
        <div className="space-y-3">
          {services.map((service, index) => (
            <label
              key={index}
              className="flex items-start cursor-pointer group"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-900/20 checked:border-[#1283BB] checked:bg-[#1283BB] transition-all"
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {service}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm lg:max-h-[40%]">
        <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
          <span className="p-1 bg-blue-50 rounded-lg text-blue-900">
            <Image src="/icons/chat.svg" alt="" width={16} height={16} />
          </span>
          Contact with us
        </h3>

        <div className="space-y-3">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=communications@srpsoftware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-2 -mx-3 rounded-xl hover:bg-gray-50 transition-all group"
          >
            <div className="w-8 h-8 bg-blue-50 text-blue-900 flex items-center justify-center rounded-full group-hover:bg-[#1283BB] group-hover:text-white transition-colors shrink-0">
              <Image
                src="/icons/text.svg"
                alt="email"
                width={20}
                height={20}
                className="group-hover:brightness-0 group-hover:invert transition-all"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-gray-900">
                Email us
              </span>
              <span
                className="text-sm text-gray-500 group-hover:text-[#1283BB
] transition-colors"
              >
                communications@srpsoftware.com
              </span>
            </div>
          </a>

          <hr className="border-gray-100" />

          <a
            href="https://www.linkedin.com/company/silkroadprofessionalsusa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-2 -mx-3 rounded-xl hover:bg-gray-50 transition-all group"
          >
            <div className="w-8 h-8 bg-blue-50 text-[#1283BB] flex items-center justify-center rounded-full group-hover:bg-[#1283BB] group-hover:text-white transition-colors shrink-0">
              <Image
                src="/icons/linkedin.svg"
                alt="linkedin"
                width={20}
                height={20}
                className="group-hover:brightness-0 group-hover:invert transition-all"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-gray-900">
                LinkedIn
              </span>
              <span
                className="text-sm text-gray-500 group-hover:text-[#1283BB
] transition-colors"
              >
                Company Page
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
