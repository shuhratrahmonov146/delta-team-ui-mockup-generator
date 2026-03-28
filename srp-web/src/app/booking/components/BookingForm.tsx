export default function BookingForm() {
  return (
    <div className="w-full m-auto">
      <div className="w-full h-calendar-default md:h-calendar-lg xl:h-calendar-md max-[650px]:h-calendar-sm calendar-container bg-[#fff] rounded-2xl overflow-hidden border border-white/20">
        <iframe
          src={`https://calendar.google.com/calendar/appointments/schedules/AcZssZ3dxahoHKuoyEnKLp0KV_LJrmUilYoi1RK694QwIZpprz8lQbHqw07PhcibVIOKPJFmepD3W5PG?gv=true&embed=1`}
          className="w-full h-full"
          style={{ border: 0 }}
          title="Booking Form"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
