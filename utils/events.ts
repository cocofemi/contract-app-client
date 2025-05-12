import axios from "axios";

type CalendarEvent = {
  creator: any;
  created: string | number | Date;
  id: string;
  summary: string;
  start: {
    date: any; dateTime: string 
};
  end: {
    date: any; dateTime: string 
};
};

type GoogleCalendarEventsResponse = {
  data: {
    data: CalendarEvent[];
  };
  status: number;

};


export const googleCalendarEvents = async (user_id?:string, email?:string ) : Promise<GoogleCalendarEventsResponse> => {
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
    console.error("Failed to fetch events:", error);
    throw error;
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
