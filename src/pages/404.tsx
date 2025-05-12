import React from "react";
function NotFound() {
  return (
    <section className=" bg-white">
      <header className="container mx-auto px-5 py-5">
        <nav className="flex justify-between"></nav>
      </header>
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 border border-blue-300 rounded-lg">
          <div className="p-6 md:py-20 justify-center">
            <h6 className="font-epilogue text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3x justify-center text-center">
              There was a problem with your request
            </h6>
            <p className="text-center">
              We are sorry, your request couldn't be completed. Please try
              again!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
