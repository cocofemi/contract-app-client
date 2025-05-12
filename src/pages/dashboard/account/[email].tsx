import { useRouter } from "next/router";
import EventsTable from "../../../../components/events-table";

function AccountsEvents() {
  const router = useRouter();
  const { email } = router.query;
  if (!email || typeof email !== "string") return null;

  return <EventsTable email={email} />;
}

export default AccountsEvents;
