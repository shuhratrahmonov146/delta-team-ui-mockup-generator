"use client";
import { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { ChevronDown } from "lucide-react";
import { COUNTRIES, Country } from "@/data/countries";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [selected, setSelected] = useState<Country>(COUNTRIES[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) {
      const found = COUNTRIES.find((c) => value.startsWith(c.code));
      if (found) setSelected(found);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const max = selected.mask.split("#").length - 1;
    const trimmed = raw.slice(0, max);
    let formatted = "";
    let idx = 0;
    for (const char of selected.mask) {
      if (idx >= trimmed.length) break;
      if (char === "#") formatted += trimmed[idx++];
      else formatted += char;
    }
    onChange(`${selected.code} ${formatted}`);
  };

  const handleSelect = (country: Country) => {
    setSelected(country);
    setOpen(false);
    onChange(`${country.code} `);
  };

  return (
    <div className="relative w-full font-sans">
      <div className="flex w-full h-12 bg-gray-50 border border-gray-200 rounded-lg transition-all focus-within:ring-1 focus-within:ring-blue-900 focus-within:border-blue-900">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 h-full border-r border-gray-200 rounded-l-lg hover:bg-gray-200/50 transition-colors shrink-0"
        >
          <div className="w-6 h-4 relative shadow-sm rounded-sm overflow-hidden">
            <Flag code={selected.iso} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-medium text-slate-800">
            {selected.code}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setOpen(false)}
            />
            <ul className="absolute z-30 top-full left-0 mt-1 w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto py-1">
              {COUNTRIES.map((country) => (
                <li
                  key={country.iso}
                  onClick={() => handleSelect(country)}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                    selected.iso === country.iso ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 shadow-sm rounded-sm overflow-hidden bg-gray-100">
                      <Flag
                        code={country.iso}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-700">
                      {country.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {country.code}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        <input
          type="tel"
          value={value.replace(selected.code, "").trim()}
          onChange={handleInputChange}
          placeholder={selected.placeholder}
          className="w-full px-4 h-full bg-transparent border-none outline-none text-slate-800 placeholder-gray-400 rounded-r-lg"
        />
      </div>
    </div>
  );
}
