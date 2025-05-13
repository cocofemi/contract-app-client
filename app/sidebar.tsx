import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./header";
import { getAccounts } from "../utils/accounts";

function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [connectedEmails, setConnectedEmail] = useState<string[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get("contract_app_user");
    setUserEmail(user?.email);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get("contract_app_user");

    if (user) {
      getAccounts(user.userId).then((res) => {
        if (res.status === 200) {
          const emails = res?.data.accounts.map((item) => item.email);
          setConnectedEmail(emails);
        } else {
          setConnectedEmail([]);
        }
      });
    }
  }, []);

  //connected accounts runs a loop displaying emails
  //each emails passes props to the events table via link

  const handleLogout = () => {
    const cookies = new Cookies();
    localStorage.clear();
    cookies.remove("contract_app_user", { path: "/" });
    router.push("/auth/login");
  };
  const currentRoute = usePathname() || "";

  const getPageAddress = () => {
    const page = currentRoute.split("/").pop() || "";
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  // styles for all links
  const linkStyle =
    "font-work_sans text-sm flex items-center px-4 py-2 rounded-full hover:bg-blue-300 ";
  // styles for active and non-active links
  const activeStyle = `${linkStyle} bg-gray-300 shadow-sm focus:ring-4 dark:text-black focus:ring-gray-300 text-secondary-900`;
  const nonActiveStyle = linkStyle + "bg-transparent text-secondary-500";

  return (
    <>
      <nav className="fixed top-0 left-0 md:left-60 right-0 border-b border-gray-100  z-50 bg-white">
        <div className="px-8 py-3 lg:px-5 lg:pl-3 pl-2 md:pl-3">
          <div className="flex items-center justify-between w-full ml-3">
            <button
              className="md:hidden text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h6 className="font-work_sans text-base md:text-lg font-bold leading-tight text-white-900">
                {getPageAddress()}
              </h6>
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/dashboard/schedule/create-link"
                type="button"
                className="flex justify-center items-center border border-secondary-500 hover:border-primary-600 rounded-full h-10 w-auto px-6 py-1 text-sm shadow-sm  font-work_sans font-semibold  hover:bg-primary-600 focus:ring-4  dark:focus:ring-gray-600 text-secondary-500  transition"
              >
                <span>Create Schedule Link</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-white bg-opacity-50 md:hidden"
        ></div>
      )}

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-[240px] h-screen overflow-y-scroll pt-5 transition-transform bg-sidebar border-table-border px-2 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-scroll bg-sidebar ">
          <div className="flex items-center justify-start bg-sidebar">
            <Header />
          </div>
          <ul className="font-medium pt-5">
            <li>
              <Link
                href="/dashboard"
                className={
                  currentRoute === "/dashboard" ? activeStyle : nonActiveStyle
                }
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#292D32">
                    <path d="M17.59 22.55H6.38c-1.83 0-3.48-1.4-3.78-3.2l-1.34-7.96c-.21-1.24.39-2.84 1.38-3.63L9.57 2.2c1.34-1.08 3.44-1.07 4.79.01l6.93 5.54c.98.79 1.58 2.38 1.38 3.62l-1.33 7.95c-.3 1.77-1.99 3.2-3.78 3.2ZM11.98 2.93c-.53-.01-1.07.15-1.46.46L3.59 8.94c-.57.46-.96 1.47-.84 2.19l1.33 7.96c.18 1.05 1.22 1.94 2.29 1.94h11.2c1.07 0 2.11-.89 2.29-1.95l1.33-7.96c.12-.72-.28-1.76-.84-2.21l-6.93-5.55c-.4-.31-.93-.47-1.47-.47Z" />
                    <path d="M12 16.25c-1.79 0-3.25-1.46-3.25-3.25s1.46-3.25 3.25-3.25 3.25 1.46 3.25 3.25 -1.46 3.25-3.25 3.25Zm0-5c-.96 0-1.75.79-1.75 1.75s.79 1.75 1.75 1.75 1.75-.79 1.75-1.75 -.79-1.75-1.75-1.75Z" />
                  </g>
                </svg>
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li className="text-xs font-work_sans ml-3 mt-5 mb-2 opacity-70 uppercase pointer-events-none">
              Google Accounts
            </li>
            <li>
              <Link
                href={`/dashboard/account/${userEmail}`}
                className={
                  currentRoute === `/dashboard/account/${userEmail}`
                    ? activeStyle
                    : nonActiveStyle
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>

                <span className="ml-3">{userEmail.slice(0, 16)}</span>
              </Link>
            </li>
            {connectedEmails.map((item) => (
              <li key={item} className="mb-4 mt-4">
                <Link
                  href={`/dashboard/account/${item}`}
                  className={
                    currentRoute === `/dashboard/account/${item}`
                      ? activeStyle
                      : nonActiveStyle
                  }
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <span className="ml-3 truncate">
                      {item?.length > 20 ? item?.slice(0, 14) + "..." : item}
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            <li className="mt-3">
              <Link
                href="/dashboard/account/add-account"
                className={
                  currentRoute === "/dashboard/account/add-account"
                    ? activeStyle
                    : nonActiveStyle
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="ml-3 text-sm">Add Google account</span>
              </Link>
            </li>

            <li className="text-xs font-work_sans ml-3 mt-5 mb-2 opacity-70 uppercase pointer-events-none">
              Hubspot
            </li>

            <li>
              <Link
                href="/dashboard/account/add-hubspot"
                className={
                  currentRoute === "/dashboard/account/add-hubspot"
                    ? activeStyle
                    : nonActiveStyle
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="ml-3 text-sm">Add Hubspot account</span>
              </Link>
            </li>

            <li className="text-xs font-work_sans ml-3 mt-5 mb-2 opacity-70 uppercase pointer-events-none">
              Schedules
            </li>
            <li className="mb-2">
              <Link
                href="/dashboard/schedule"
                className={
                  currentRoute === "/dashboard/schedule"
                    ? activeStyle
                    : nonActiveStyle
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Availability
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/schedule/create-link"
                className={
                  currentRoute === "/dashboard/schedule/create-link"
                    ? activeStyle
                    : nonActiveStyle
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Schedule Links
                </span>
              </Link>
            </li>

            <li className="text-xs font-work_sans ml-3 mt-5 mb-2 opacity-70 uppercase pointer-events-none">
              Account
            </li>
            <li>
              <Link
                href="/dashboard/account/profile"
                className={
                  currentRoute === "/dashboard/account/profile"
                    ? activeStyle
                    : nonActiveStyle
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g fill="#000">
                    <path d="M12 22.75c-.67 0-1.35-.17-1.95-.52L4.1 18.8c-1.2-.7-1.95-1.99-1.95-3.38V8.58c0-1.39.75-2.68 1.95-3.38l5.94-3.43c1.2-.7 2.69-.7 3.9 0l5.94 3.42c1.2.7 1.95 1.99 1.95 3.38v6.83c0 1.39-.75 2.68-1.95 3.38l-5.94 3.43c-.6.35-1.28.52-1.95.52Zm0-20c-.41 0-.83.11-1.2.32L4.85 6.5c-.74.43-1.2 1.22-1.2 2.08v6.83c0 .85.46 1.65 1.2 2.08l5.94 3.43c.74.43 1.66.43 2.4 0l5.94-3.43c.74-.43 1.2-1.22 1.2-2.08V8.57c0-.85-.46-1.66-1.2-2.09l-5.94-3.43c-.37-.21-.79-.32-1.2-.32Z" />
                    <path d="M11.99 11.74c-1.7 0-3.08-1.38-3.08-3.08 0-1.7 1.37-3.08 3.07-3.08 1.7 0 3.08 1.37 3.08 3.07 0 1.7-1.38 3.08-3.08 3.08Zm0-4.66c-.87 0-1.58.7-1.58 1.57 0 .87.71 1.58 1.58 1.58.87 0 1.58-.71 1.58-1.58 0-.87-.71-1.58-1.58-1.58ZM16 17.41c-.41 0-.75-.34-.75-.75 0-1.38-1.46-2.51-3.25-2.51s-3.25 1.12-3.25 2.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-2.21 2.13-4.01 4.75-4.01s4.75 1.79 4.75 4c0 .41-.34.75-.75.75Z" />
                  </g>
                </svg>
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                href=""
                className="font-work_sans text-sm flex items-center p-2 transition duration-75 rounded-lg text-black hover:bg-gray-100  dark:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g fill="#000">
                    <path d="M15.23 22.27h-.13c-4.44 0-6.59-1.75-6.96-5.67-.04-.41.26-.78.68-.82.4-.04.78.27.82.68.29 3.14 1.77 4.31 5.46 4.31h.13c4.07 0 5.51-1.44 5.51-5.51V8.73c0-4.07-1.44-5.51-5.51-5.51h-.13c-3.71 0-5.2 1.19-5.47 4.39-.05.41-.4.72-.82.68a.751.751 0 0 1-.69-.81c.34-3.98 2.49-5.76 6.96-5.76h.13c4.91 0 7.01 2.1 7.01 7.01v6.52c0 4.91-2.1 7.01-7.01 7.01Z" />
                    <path d="M14.99 12.75H3.61c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h11.37c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
                    <path d="M5.84 16.09c-.19 0-.38-.07-.53-.22l-3.35-3.35a.754.754 0 0 1 0-1.06l3.35-3.35c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.82 2.81 2.82 2.82c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22Z" />
                  </g>
                </svg>
                <span className="ml-3 text-black">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div>{children}</div>
      <ToastContainer />
    </>
  );
}

export default Sidebar;
