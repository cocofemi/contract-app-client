import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingPage() {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");

  const router = useRouter();
  const { slug } = router.query;
  const [linkData, setLinkData] = useState<any>(null);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (linkData) {
      setAnswers(new Array(linkData.questions?.length || 0).fill(""));
    }
  }, [linkData]);

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/scheduling-link/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLinkData(data.data);
        else router.push("/404");
      });
  }, [slug]);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/create/meeting`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.userId,
          linkId: linkData?._id,
          email,
          linkedin,
          answers,
          scheduledTime: selectedTime,
        }),
      }
    );
    const json = await res.json();
    if (json.success) {
      // setSuccessSlug(json.data.slug);
      toast("Meeting Booked. You can close the window now.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("There was a problem booking the meeting. Try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  //   if (!linkData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Schedule a {linkData?.meetingLength} minute(s) meeting
        </h1>

        <div className="space-y-4">
          <p className="font-medium">Select a time:</p>
          <div className="grid grid-cols-2 gap-4">
            {["10:00 AM", "11:30 AM", "2:00 PM", "4:15 PM"].map((time, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`border rounded px-4 py-2 ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 border-blue-500 hover:bg-blue-50"
                }`}
              >
                {time}
              </button>
            ))}
            {selectedTime && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block font-medium">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">LinkedIn URL</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                {linkData.questions?.map((question: string, i: number) => (
                  <div key={i}>
                    <label className="block font-medium">{question}</label>
                    <textarea
                      value={answers[i]}
                      onChange={(e) => {
                        const updated = [...answers];
                        updated[i] = e.target.value;
                        setAnswers(updated);
                      }}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                ))}

                <button
                  className={`w-full py-2 px-4 rounded ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Now"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
