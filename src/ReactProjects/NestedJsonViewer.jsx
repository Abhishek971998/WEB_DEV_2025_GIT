import React, { useState } from "react";

const JSONNode = ({ data, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  if (typeof data !== "object" || data === null) {
    return (
      <input
        value={data}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    );
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <span
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer" }}
      >
        {expanded ? "▼" : "▶"}
      </span>

      {expanded &&
        Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong>
            <JSONNode
              data={value}
              onChange={(newVal) => {
                data[key] = newVal;
                onChange({ ...data });
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default function App() {
  const [json, setJson] = useState({
    name: "John",
    address: { city: "NY", zip: 10001 },
  });

  return (
    <div>
      <h3>Nested JSON Viewer</h3>
      <JSONNode data={json} onChange={setJson} />
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}
