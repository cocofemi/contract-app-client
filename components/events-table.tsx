import React, { useEffect } from "react";
import Sidebar from "../app/sidebar";
import { getSingleAccount } from "../utils/accounts";
import { googleCalendarEvents } from "../utils/events";

type Props = {
  email: string;
};

function EventsTable({ email }: Props) {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setEvents([]); // reset event list

    if (!email) return;
    getSingleAccount(email).then((res: any) => {
      console.log(res?.data);
      googleCalendarEvents(res?.data?.userId || res?.data?._id, email).then(
        (res: any) => {
          setLoading(false);
          if (res?.status === 200) {
            setEvents(res?.data.data);
          } else {
            setEvents([]);
          }
        }
      );
    });
  }, [email]);

  //fetch connected account events passing email and token gotten from props
  return (
    <Sidebar>
      <div className="my-4 bg-white px-4 pt-16 sm:ml-60 md:pt-20 lg:px-12">
        <section>
          <div className="relative mt-4 overflow-x-auto">
            <p className="text-black font-bold text-2xl ml-6">Events</p>
            {loading && (
              <p className="text-black font-bold ml-6 mt-4">Loading...</p>
            )}
            {!loading && (
              <table className="w-full text-left font-work_sans text-sm text-gray-500 dark:text-gray-400">
                <thead className="rounded-2xl bg-table_header text-xs font-normal capitalize text-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="rounded-bl-lg rounded-tl-lg px-6 py-3 font-medium"
                    >
                      Summary
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Creator
                    </th>
                    <th
                      scope="col"
                      className="min-w-[180px] px-6 py-3 font-medium"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="min-w-[180px] px-6 py-3 font-medium"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="rounded-br-lg rounded-tr-lg px-6 py-3"
                    >
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((item: any, index: number) => (
                    <tr
                      key={item.id}
                      className="border-b border-table_border bg-white text-gray-900 hover:bg-gray-50  "
                    >
                      <td className="px-6 py-2.5 font-medium text-gray-900">
                        {item.summary || "Untitled"}
                      </td>
                      {/* <td
                        scope="row"
                        className="flex items-center gap-x-3 whitespace-nowrap px-6 py-2.5 dark:text-white"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 font-work_sans font-normal uppercase">
                          {new Date(item.created).toDateString()}
                        </span>
                      </td> */}
                      <td className="px-6 py-2.5">
                        {new Date(item.created).toDateString()}
                      </td>
                      <td className="px-6 py-2.5">{item.creator.email}</td>
                      <td className="px-6 py-2.5">
                        {item.start.dateTime &&
                          new Date(item.start.dateTime).toDateString()}
                        {item.start.date && item.start.date}
                      </td>
                      <td className="px-6 py-2.5">
                        {item.end.dateTime &&
                          new Date(item.end.dateTime).toDateString()}
                        {item.end.date && item.end.date}
                      </td>
                      <td className="px-6 py-2.5 text-right">
                        {/* <button
                            onClick={() => handleClick(item)}
                            className="flex items-center justify-center gap-x-1 rounded-lg border border-gray-200 px-3 py-1 pr-5 font-normal text-gray-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                            >
                              <g fill="#292D32">
                                <path d="M14.82 11.99c0 1.56-1.27 2.83-2.83 2.83-1.57 0-2.83-1.27-2.83-2.83 0-1.57 1.26-2.83 2.82-2.83 1.56 0 2.83 1.26 2.83 2.82Zm1.5 0c0-2.4-1.94-4.33-4.33-4.33-2.4 0-4.33 1.93-4.33 4.32 0 2.39 1.93 4.33 4.32 4.33 2.39 0 4.33-1.94 4.33-4.33Z" />
                                <path d="M12 21.02c3.78 0 7.31-2.21 9.74-6.03 1.05-1.66 1.05-4.34-.01-6-2.44-3.83-5.96-6.03-9.75-6.03s-7.32 2.2-9.75 6.02c-1.06 1.65-1.06 4.34 0 5.99 2.43 3.82 5.95 6.02 9.74 6.02Zm0-1.5c-3.24 0-6.31-1.92-8.48-5.34-.75-1.17-.75-3.23-.01-4.39 2.17-3.42 5.23-5.34 8.47-5.34 3.23 0 6.3 1.91 8.47 5.33.74 1.16.74 3.22 0 4.38-2.18 3.41-5.24 5.33-8.48 5.33Z" />
                              </g>
                            </svg>
                            View
                          </button> */}
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-2.5 text-center text-gray-500"
                      >
                        No events found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </Sidebar>
  );
}

export default EventsTable;
