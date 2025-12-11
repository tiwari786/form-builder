import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";


export default function FormBuilder({onSaved }) {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { label: "", type: "text", options: [], required: false },
    ]);
  };

  const updateField = (i, key, val) => {
    setFields((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, [key]: val } : f))
    );
  };

  const addOption = (i) => {
    setFields((prev) =>
      prev.map((f, idx) =>
        idx === i ? { ...f, options: [...f.options, ""] } : f
      )
    );
  };

  const updateOption = (i, oi, val) => {
    setFields((prev) =>
      prev.map((f, idx) =>
        idx === i
          ? {
              ...f,
              options: f.options.map((opt, optIndex) =>
                optIndex === oi ? val : opt
              ),
            }
          : f
      )
    );
  };

  const removeField = (i) => {
    setFields((prev) => prev.filter((_, idx) => idx !== i));
  };

  const saveForm = async () => {
    if (!title.trim()) return alert("Please enter a title!");

    try {
      const res = await API.post("/form", { title, fields });

      if (res.data.success) {
        alert("Form saved successfully!");
        onSaved();
      }

      // Reset UI
      setTitle("");
      setFields([]);
      onSaved();

    } catch (error) {
      console.log("Error saving form:", error);
      alert("Something went wrong while saving form.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      
      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={addField}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 cursor-pointer"
      >
        + Add Field
      </button>

      {fields.map((f, i) => (
        <div key={i} className="border p-3 rounded mb-4 bg-gray-50">

          <input
            className="border p-2 w-full rounded mb-2"
            placeholder="Field Label"
            value={f.label}
            onChange={(e) => updateField(i, "label", e.target.value)}
          />

          <select
            className="border p-2 rounded mb-2"
            value={f.type}
            onChange={(e) => updateField(i, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="dropdown">Dropdown</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={f.required}
              onChange={(e) => updateField(i, "required", e.target.checked)}
            />
            Required
          </label>

          {(f.type === "dropdown" || f.type === "radio") && (
            <div>
              <button
                onClick={() => addOption(i)}
                className="text-sm bg-gray-800 text-white px-2 py-1 rounded cursor-pointer"
              >
                + Add Option
              </button>

              {f.options.map((opt, oi) => (
                <input
                  key={oi}
                  className="border p-2 w-full rounded mt-2"
                  placeholder="Option"
                  value={opt}
                  onChange={(e) => updateOption(i, oi, e.target.value)}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => removeField(i)}
            className="bg-red-600 text-white px-3 py-1 rounded mt-3 cursor-pointer"
          >
            Remove Field
          </button>
        </div>
      ))}

      <button
        onClick={saveForm}
        
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 cursor-pointer"
      >
        Save Form
      </button>
    </div>
  );
}
