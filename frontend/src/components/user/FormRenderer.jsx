import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

export default function FormRenderer() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    API.get(`/form/${id}`).then((res) => setForm(res.data.data));
  }, []);

  const handleChange = (label, val) => {
    setAnswers({ ...answers, [label]: val });
  };

  const submit = async () => {
    await API.post("/responses", { formId: id, answers });
    alert("Form submitted!");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{form.title}</h2>

      {form.fields.map((f, i) => (
        <div key={i} className="mb-4">
          <label className="block mb-2 font-medium">
            {f.label}
          </label>

          {f.type === "text" && (
            <input
              className="border p-2 w-full rounded"
              onChange={(e) => handleChange(f.label, e.target.value)}
            />
          )}

          {f.type === "dropdown" && (
            <select
              className="border p-2 w-full rounded"
              onChange={(e) => handleChange(f.label, e.target.value)}
            >
              <option value="">Select Option</option>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}

          {f.type === "radio" &&
            f.options.map((o) => (
              <label key={o} className="block">
                <input
                  type="radio"
                  name={f.label}
                  value={o}
                  onChange={() => handleChange(f.label, o)}
                />
                {o}
              </label>
            ))}

          {f.type === "checkbox" && (
            <input
              type="checkbox"
              onChange={(e) => handleChange(f.label, e.target.checked)}
            />
          )}
        </div>
      ))}

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
