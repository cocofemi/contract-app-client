import axios, { AxiosResponse } from "axios";

export type ConnectedAccount = {
  userId: string;
  _id: string;
  email: string;
  accessToken: string;
  refreshToken?: string;
  provider?: string;
};

export type GetAccountsResponse = {
  status: number;
  data: {
    accounts: ConnectedAccount[];
  };
};

export const getAccounts = async (user_id: string): Promise<AxiosResponse<{ accounts: ConnectedAccount[] }>> => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/google/accounts?user_id=${user_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    return response;
  } catch (error: unknown) {
    console.error("Failed to fetch accounts:", error);
    throw error;
  }
};


export const getSingleAccount = async (email:string): Promise<AxiosResponse<ConnectedAccount>> => {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/google/account?email=${email}`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    return response;
  } catch (error: unknown) {
    console.error("Failed to fetch account:", error);
    throw error;
  }
};

