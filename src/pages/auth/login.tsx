import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../../utils/auth";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

function Login() {
  const cookies = new Cookies();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = (googleData: unknown) => {
    setLoading(true);
    googleLogin(googleData)
      .then((res) => {
        console.log(res?.data);
        cookies.set("contract_app_user", JSON.stringify(res.data), {
          path: "/",
        });
        if (res?.data?.accessToken === null) {
          router.push("/googlecalendar");
        } else {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className=" bg-white">
      <header className="container mx-auto px-5 py-5">
        <nav className="flex justify-between"></nav>
      </header>
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-screen justify-center bg-gray-50">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 border border-blue-300 rounded-lg">
          <div className="p-6 md:py-20 justify-center">
            <h6 className="font-epilogue text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-3x justify-center text-center">
              Login or register
            </h6>
            <p className="text-center">
              Click the button to register or login with your google account
            </p>
            <div className="col-lg-12 d-flex justify-content-center mb-4 mt-4">
              <GoogleOAuthProvider
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
              >
                <GoogleLogin
                  size="large"
                  onSuccess={(credentialResponse) => {
                    handleGoogleLogin(credentialResponse.credential);
                  }}
                  onError={() => {}}
                />
              </GoogleOAuthProvider>
            </div>
            {loading && (
              <p className="text-center font-bold text-lg">Loading....</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
