import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import Sidebar from "../../../app/sidebar";
import { googleCalendarEvents } from "../../../utils/events";
import { gradient } from "../../../components/Gradient";

function Dashboard() {
  const cookies = new Cookies();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const [meetings, setMeetings] = useState<any[]>([]);
  useEffect(() => {
    const user = cookies.get("contract_app_user");
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/meetings?userId=${user?.userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMeetings(data.data);
        }
      });
  }, []);

  useEffect(() => {
    const user = cookies.get("contract_app_user");
    googleCalendarEvents(user?.userId, user?.email).then((res: any) => {
      console.log(res);
      setLoading(false);
      if (res?.status === 200) {
        setEvents(res?.data.data);
      } else {
        setEvents([]);
      }
    });
  }, []);

  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <Sidebar>
      {!loading && (
        <div className="my-4 bg-white px-4 pt-16 sm:ml-60 md:pt-20 lg:px-12">
          <section>
            <div className="relative mt-4 overflow-x-auto">
              <div className="max-w-5xl mx-auto p-8 space-y-6">
                <h1 className="text-2xl font-bold">Your Scheduled Meetings</h1>
                {loading && <p>Loading....</p>}

                {meetings.length === 0 && <p>No meetings found</p>}

                {meetings.map((meeting) => (
                  <div
                    key={meeting._id}
                    className="border border-gray-200 rounded p-4 space-y-2 bg-white shadow-sm"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p>
                          <strong>Email:</strong> {meeting.email}
                        </p>
                        {meeting.linkedin && (
                          <p>
                            <strong>LinkedIn:</strong>{" "}
                            <a
                              href={meeting.linkedin}
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              View
                            </a>
                          </p>
                        )}
                        <p>
                          <strong>Scheduled Time:</strong>{" "}
                          {meeting.scheduledTime}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        📅 {new Date(meeting.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Answers:</h3>
                      <ul className="list-disc ml-6 text-sm">
                        {meeting.answers.map((a: string, i: number) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    {meeting.augmentedNotes && (
                      <div>
                        <h3 className="font-semibold mt-2">🔍 AI Insights:</h3>
                        <p className="text-gray-700 text-sm">
                          {meeting.augmentedNotes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </Sidebar>
  );
}

export default Dashboard;
