import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function ResponsesList() {
  const { id } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get(`/responses/${id}`).then((res) => setList(res.data.data));
  }, []);

  return (
    <div className="space-y-4">
  {list.map((response) => (
    <div
      key={response._id}
      className="border p-4 rounded bg-white shadow"
    >
      <h3 className="font-semibold mb-2 text-gray-800">
        Response
      </h3>

      {Object.entries(response.answers).map(([label, value]) => (
        <p key={label} className="text-gray-700">
          <span className="font-bold">{label}:</span> {value}
        </p>
      ))}
    </div>
  ))}
</div>

  );
}
