import React from "react";
import Image from "next/image";
import googlecalendar from "../../public/google-calendar-svgrepo-com.svg";
import Cookies from "universal-cookie";

function GoogleCalendar() {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");

  async function connectGoogleCalendarPopup() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/google/accesstoken?user_id=${user?.userId}&type=login`
      );
      const data = await res.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      console.error("Failed to fetch OAuth URL:", err);
    }
  }

  return (
    <section className="bg-white">
      <header className="container mx-auto px-5 py-5">
        <nav className="flex justify-between"></nav>
      </header>
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-screen justify-center bg-gray-50">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 border border-blue-300 rounded-lg">
          <div className="p-6 md:py-20 justify-center">
            <h6 className="font-epilogue text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl justify-center text-center">
              Add google calendar
            </h6>
            <p className="text-center">
              Integrate with your google calendar to schedule and view your
              events.
            </p>
            <div className="col-lg-12 d-flex justify-content-center mb-4 mt-4">
              <div className="flex flex-col items-center space-x-3">
                <button
                  onClick={connectGoogleCalendarPopup}
                  type="submit"
                  className="flex items-center justify-center rounded-md h-12 font-bold cursor-pointer p-4 bg-indigo-600 text-white"
                >
                  <Image
                    src={googlecalendar}
                    alt="google calendar"
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                  Add Google Calendar
                </button>
              </div>
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoogleCalendar;
