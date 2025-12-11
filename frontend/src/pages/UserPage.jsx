import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function UserPage() {
  const [forms, setForms] = useState([]);

  const load = async () => {
    const res = await API.get("/form");
    setForms(res.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Forms</h2>

      {forms.map((f) => (
        <div key={f._id} className="border p-3 rounded mb-3">
          <h3 className="font-semibold">{f.title}</h3>
          <Link
            to={`/render/${f._id}`}
            className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Fill Form
          </Link>
        </div>
      ))}
    </div>
  );
}
