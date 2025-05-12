import React from "react";
import AvailabilityForm from "../../../../components/schedule.form";
import Cookies from "universal-cookie";
import Sidebar from "../../../../app/sidebar";

function Index() {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");

  console.log(user);

  return (
    <Sidebar>
      <div className="my-4 bg-white px-4 pt-16 sm:ml-60 md:pt-20 lg:px-12">
        <AvailabilityForm userId={user?.userId} />;
      </div>
    </Sidebar>
  );
}

export default Index;
