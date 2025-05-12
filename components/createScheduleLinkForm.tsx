import React from "react";
import Sidebar from "../app/sidebar";

import { useState } from "react";

type FormData = {
  slug: string;
  meetingLength: number;
  maxDaysInAdvance: number;
  maxUses?: number;
  expiresAt?: string;
  questions: string[];
};

export default function CreateScheduleLinkForm({
  userId,
  schedulingWindowId,
}: {
  userId: string;
  schedulingWindowId: string;
}) {
  const [form, setForm] = useState<FormData>({
    slug: "",
    meetingLength: 30,
    maxDaysInAdvance: 7,
    questions: [""],
  });

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...form.questions];
    updated[index] = value;
    setForm((prev) => ({ ...prev, questions: updated }));
  };

  const addQuestion = () => {
    setForm((prev) => ({ ...prev, questions: [...prev.questions, ""] }));
  };

  const removeQuestion = (index: number) => {
    const updated = [...form.questions];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, questions: updated }));
  };

  const [loading, setLoading] = useState(false);
  const [successSlug, setSuccessSlug] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/book/${successSlug}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "meetingLength" ||
        name === "maxDaysInAdvance" ||
        name === "maxUses"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/create/schedule-link`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId,
          schedulingWindowId,
        }),
      }
    );

    const json = await res.json();
    if (json.success) {
      setSuccessSlug(json.data.slug);
    } else {
      alert("Failed to create link.");
    }
    setLoading(false);
  };

  return (
    <Sidebar>
      <div className="my-4 bg-white px-4 pt-16 sm:ml-60 md:pt-20 lg:px-12">
        <div className="space-y-6 max-w-xl">
          <h2 className="text-xl font-semibold">Create Scheduling Link</h2>

          {successSlug && (
            <div className="text-green-600 mt-4 space-y-2">
              <p>Link created:</p>
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded px-3 py-2">
                <code className="text-green-700">
                  {process.env.NEXT_PUBLIC_SERVER_URL}/book/{successSlug}
                </code>
                <button
                  onClick={handleCopy}
                  className="text-sm text-green-700 border border-green-600 px-2 py-1 rounded hover:bg-green-100"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          <label htmlFor="">Name</label>
          <input
            type="text"
            name="slug"
            placeholder="Meeting name"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label htmlFor="">Meeting length (minutes)</label>
          <input
            type="number"
            name="meetingLength"
            placeholder="Meeting length in minutes"
            value={form.meetingLength}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label htmlFor="">
            The maximum number of days in advance meet can be scheduled
          </label>
          <input
            type="number"
            name="maxDaysInAdvance"
            placeholder="Max days in advance"
            value={form.maxDaysInAdvance}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label htmlFor="">Maximum number of uses</label>
          <input
            type="number"
            name="maxUses"
            placeholder="Max uses (optional)"
            value={form.maxUses ?? ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label htmlFor="">Link expiry (date)</label>
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <div className="space-y-2">
            <label className="font-medium">Custom Questions</label>
            {form.questions.map((q, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => handleQuestionChange(i, e.target.value)}
                  placeholder={`Question ${i + 1}`}
                  className="flex-grow border rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="text-blue-500 mt-1"
            >
              + Add Question
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Link"}
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
