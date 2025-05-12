import React from "react";
import Sidebar from "../../../../app/sidebar";
import Image from "next/image";
import googlecalendar from "../../../../public/google-calendar-svgrepo-com.svg";
import Cookies from "universal-cookie";

function AddAccount() {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");

  const connectGoogleCalendarPopup = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/google/accesstoken?user_id=${user?.userId}&type=add-account`
      );
      const data = await res.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      console.error("Failed to fetch OAuth URL:", err);
    }
  };
  return (
    <Sidebar>
      <div className="my-4 bg-white px-4 pt-16 sm:ml-60 md:pt-20 lg:px-12">
        <div className="relative mt-4 overflow-x-auto">
          <section className="bg-white text-black">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 border border-blue-300 rounded-lg">
                <div className="p-6 md:py-20 justify-center text-black">
                  <h6 className="font-epilogue text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl justify-center text-center">
                    Add Accounts
                  </h6>
                  <p className="text-center">
                    You can add more google accounts to your profile to view
                    events from those acocunts
                  </p>
                  <div className="col-lg-12 d-flex justify-content-center mb-4 mt-4">
                    <div className="flex flex-col items-center space-x-3">
                      <button
                        onClick={connectGoogleCalendarPopup}
                        type="submit"
                        className="flex items-center justify-center rounded-md h-12  font-bold cursor-pointer p-4 bg-indigo-600 text-white"
                      >
                        <Image
                          src={googlecalendar}
                          alt="google calendar"
                          width={30}
                          height={30}
                          className="mr-2"
                        />
                        Add Google account
                      </button>
                    </div>
                    <button></button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Sidebar>
  );
}

export default AddAccount;
