import axios from "axios";

export const googleCalendarEvents = async (user_id?:string, email?:string ) => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/get/events?user_id=${user_id}&email=${email}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};

  export async function connectGoogleCalendarPopup(userId:string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/google/accesstoken?user_id=${userId}&type=login`
      );
      const data = await res.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      console.error("Failed to fetch OAuth URL:", err);
    }
  }
