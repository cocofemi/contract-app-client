import Sidebar from "../../../../app/sidebar";

function ProfilePage() {
  return (
    <Sidebar>
      <div className="my-4 bg-white px-4 pt-16 sm:ml-60 md:pt-20 lg:px-12">
        <div className="relative mt-4 overflow-x-auto">
          <section className="bg-white text-black">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 border border-blue-300 rounded-lg">
                <div className="p-6 md:py-20 justify-center text-black">
                  <h6 className="font-epilogue text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl justify-center text-center">
                    Profile Page
                  </h6>
                  <p className="text-center">
                    Page under construction. Check back later.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Sidebar>
  );
}

export default ProfilePage;
