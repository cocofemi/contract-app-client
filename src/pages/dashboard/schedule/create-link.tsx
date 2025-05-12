import React, { useEffect, useState } from "react";
import CreateScheduleLinkForm from "../../../../components/createScheduleLinkForm";
import Cookies from "universal-cookie";

function CreateLinkForm() {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");
  const [schedulingWindowId, setSchedulingWindowId] = useState("");

  const getSchedule = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule-dates?userId=${user?.userId}`
    );
    if (res.ok) {
      const json = await res.json();
      setSchedulingWindowId(json.data._id);
    }
  };

  console.log(schedulingWindowId);

  useEffect(() => {
    getSchedule();
  });

  return (
    <CreateScheduleLinkForm
      userId={user?.userId}
      schedulingWindowId={schedulingWindowId}
    />
  );
}

export default CreateLinkForm;
