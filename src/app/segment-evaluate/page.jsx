"use client";
import React, { useState } from "react";
import SegmentEditor from "../../components/SegmentEditor";
import { api } from "@/lib/api"; // assuming your axios instance is here

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (rulesText) => {
    try {
      setIsLoading(true);
      setError("");
      setResults(null);

      const res = await api.post("/segments/evaluate", { rules: rulesText });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 mt-30 ">
      <h1 className="text-2xl font-bold mb-6 text-purple-200 flex justify-center">
        Product Segmentation Tool
      </h1>
      <SegmentEditor
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        results={results}
      />
    </main>
  );
}
