import FormsList from "../components/admin/FormsList";
import FormBuilder from "../components/admin/FormBuilder";
import { useState, useEffect } from "react";
import API from "../api/api";

export default function AdminPage() {
  const [forms, setForms] = useState([]);

  const loadForms = async () => {
    try {
      const res = await API.get("/form");
      setForms(res.data.data);
    } catch (error) {
      console.log("Error loading forms", error);
    }
  };

  useEffect(() => {
    loadForms(); // Component mount → fetch forms
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Form Builder */}
      <FormBuilder onSaved={loadForms} />

      {/* Form List */}
      <FormsList forms={forms} reload={loadForms} />

    </div>
  );
}
