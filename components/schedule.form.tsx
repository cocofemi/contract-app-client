import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Props = {
  userId: string;
};

type AvailabilityRow = {
  day: string;
  start: string;
  end: string;
};

type Field = keyof AvailabilityRow;

export default function AvailabilityForm({ userId }: Props) {
  const cookies = new Cookies();
  const user = cookies.get("contract_app_user");

  const [windows, setWindows] = useState<AvailabilityRow[]>([
    { day: "Monday", start: "09:00", end: "17:00" },
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addRow = () => {
    setWindows([...windows, { day: "Monday", start: "09:00", end: "17:00" }]);
  };

  const updateRow = (index: number, field: Field, value: string) => {
    const updated = [...windows];
    updated[index][field] = value;
    setWindows(updated);
  };

  const removeRow = (index: number) => {
    setWindows(windows.filter((_, i) => i !== index));
  };

  const fetchAvailability = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule-dates?userId=${user?.userId}`
      );
      if (res.ok) {
        const json = await res.json();
        setWindows(json.data.windows);
      } else {
        setWindows([{ day: "Monday", start: "09:00", end: "17:00" }]); // fallback
      }
    } catch (err) {
      console.error("Error fetching availability:", err);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [userId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/scheduling-window/new`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, windows }),
        }
      );
      if (res.ok) {
        setSuccess(true);
        setWindows([{ day: "Monday", start: "09:00", end: "17:00" }]);
      } else {
        alert("Failed to save");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Scheduling Window</h2>

      {windows.map((window, index) => (
        <div key={index} className="flex gap-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="">Week Day</label>
            <select
              value={window.day}
              onChange={(e) => updateRow(index, "day", e.target.value)}
              className="border rounded px-2 py-1"
            >
              {weekdays.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Start Hour</label>
            <input
              type="time"
              value={window.start}
              onChange={(e) => updateRow(index, "start", e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">End Hour</label>
            <input
              type="time"
              value={window.end}
              onChange={(e) => updateRow(index, "end", e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={() => removeRow(index)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addRow}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        + Add Row
      </button>

      <div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Availability"}
        </button>

        {success && <p className="text-green-500 mt-2">Saved successfully!</p>}
      </div>
    </div>
  );
}
