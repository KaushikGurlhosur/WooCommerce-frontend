"use client";
import React, { useState } from "react";

// Simple component to display JSON beautifully
const PrettifiedJSON = ({ data }) => (
  <pre className="mt-4 p-4 bg-gray-50 border rounded-lg overflow-x-auto text-sm max-h-96">
    <code>{JSON.stringify(data, null, 2)}</code>
  </pre>
);

export default function SegmentEditor({ onSubmit, isLoading, error, results }) {
  const [rulesText, setRulesText] = useState(
    // Example starter rules
    `price > 100
stock_status = instock
on_sale = true`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rulesText);
  };

  return (
    <div className="p-6 border border-dashed border-gray-400 rounded-xl bg-gray-50 shadow-inner">
      <h3 className="text-xl font-semibold mb-3">📝 Segment Rule Editor</h3>
      <p className="text-sm text-gray-600 mb-4">
        Enter one product condition per line (e.g.,{" "}
        <code className="bg-white px-1 rounded">price &lt; 50</code>,{" "}
        <code className="bg-white px-1 rounded">category = T-Shirts</code>).
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          rows="6"
          value={rulesText}
          onChange={(e) => setRulesText(e.target.value)}
          className="p-3 border rounded-lg font-mono text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter segmentation rules here..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition disabled:opacity-50">
          {isLoading ? "Evaluating..." : "Evaluate Segment"}
        </button>
      </form>

      {/* Results Display */}
      <div className="mt-6">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {results && (
          <div className="bg-white p-4 border rounded-lg shadow-md">
            <h4 className="text-lg font-bold mb-2 text-purple-700">
              Segment Evaluation Results:
            </h4>
            <p className="text-gray-700">
              Found <strong>{results.count}</strong> products matching the
              segment rules.
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                View Full JSON Response
              </summary>
              <PrettifiedJSON data={results} />
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
