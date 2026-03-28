import { LightbulbIcon } from "@/components/icons/calendarIcons/LightbulbIcon";
import { CompassIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
export default function BookingDescription() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-12 tracking-tight">
        Book your consultation
      </h1>
      <div className="flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl shrink-0">
              <LightbulbIcon className="w-6 h-6" />
            </div>
            <p className="text-lg opacity-90 pt-1 leading-relaxed">
              Expert guidance tailored to your specific project needs and
              technical challenges.
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl shrink-0">
              <CompassIcon className="w-6 h-6" />
            </div>
            <p className="text-lg opacity-90 pt-1 leading-relaxed">
              A clear roadmap with actionable next steps you can implement right
              away.
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-3 rounded-xl shrink-0">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <p className="text-lg opacity-90 pt-1 leading-relaxed">
              Technology recommendations based on your goals, timeline, and
              budget.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 mb-8 md:mb-0">
        <blockquote className="text-xl italic opacity-90 leading-relaxed max-w-lg mb-[24px]">
          &quot;SRP has effectively communicated with us to deliver quality
          software, enabling us to achieve our multiyear project goals&quot;
        </blockquote>
        <div className="flex flex-row gap-2 items-center">
          <div className="relative w-12 h-12 overflow-hidden rounded-full shrink-0">
            <Image
              src="/booking/glenn_esh.jpg"
              alt="Glenn Esh"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Glenn Esh</h2>
            <p className="text-sm opacity-70">Principal Architect</p>
          </div>
        </div>
      </div>
    </div>
  );
}
