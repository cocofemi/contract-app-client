import axios from "axios";

export const googleLogin = async (googleData:any) => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/google/auth`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        token: googleData,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async (user_id:string) => {
try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/user?user_id=${user_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
}
