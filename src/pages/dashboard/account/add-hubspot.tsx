import React, { useEffect, useState } from "react";
import Sidebar from "../../../../app/sidebar";
import Cookies from "universal-cookie";
import { getUser } from "../../../../utils/auth";

function AddHubspot() {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");

  const [hubspot, setHubSpot] = useState([]);

  const connectHubspot = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/hubspot/auth-url?user_id=${user.userId}`
    );
    const { authUrl } = await res.json();
    window.location.href = authUrl;
  };

  useEffect(() => {
    getUser(user?.userId).then((res: any) => {
      console.log(res?.data.hubspot);
      setHubSpot(res?.data.hubspot);
    });
  });

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
                    Integerate your hubspot account to view your events and
                    schedule
                  </p>
                  {hubspot.length === 0 && (
                    <div className="col-lg-12 d-flex justify-content-center mb-4 mt-4">
                      <div className="flex flex-col items-center space-x-3">
                        <button
                          onClick={connectHubspot}
                          type="submit"
                          className="flex items-center justify-center rounded-md h-12  font-bold cursor-pointer p-4 bg-indigo-600 text-white"
                        >
                          {/* <Image
                          src={googlecalendar}
                          alt="google calendar"
                          width={30}
                          height={30}
                          className="mr-2"
                        /> */}
                          Add Hubspot account
                        </button>
                      </div>
                      <button></button>
                    </div>
                  )}
                  {hubspot.length > 0 && (
                    <div className="col-lg-12 d-flex justify-content-center mb-4 mt-4">
                      <div className="flex flex-col items-center space-x-3">
                        <p className="text-center font-bold text-lg">
                          You have already added your hubspot account.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Sidebar>
  );
}

export default AddHubspot;
