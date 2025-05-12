import axios from "axios";

export const getAccounts = async (user_id:string) => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/google/accounts?user_id=${user_id}`,
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

export const getSingleAccount = async (email:string) => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/google/account?email=${email}`,
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

