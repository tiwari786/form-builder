import { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

export default function FormsList() {
  const [forms, setForms] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/form");
      setForms(res.data.data || []);
    } catch (error) {
      console.log("Error loading forms:", error);
    }
  };

  const del = async (id) => {
    try {
      if (!confirm("Delete this form?")) return;
      await API.delete(`/form/${id}`);
      load(); // refresh list
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      {forms.map((f) => (
        <div
          key={f._id}
          className="border p-3 rounded mb-3 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{f.title}</h3>
          </div>

          <div className="flex gap-4">
            <Link className="text-blue-600" to={`/render/${f._id}`}>
              Open
            </Link>
            <Link className="text-green-600" to={`/responses/${f._id}`}>
              Responses
            </Link>
            <button
              className="text-red-600 cursor-pointer"
              onClick={() => del(f._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
