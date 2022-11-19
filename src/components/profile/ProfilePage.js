import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";

export default function ProfilePage() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function () {
    async function ProfilePage() {
      try {
        const response = await http.get("social/profiles/Mikael");
        console.log("response", response.data);
        setDetails(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    ProfilePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="loading">Loading pages...</div>;

  if (error) return <div>An error occurred</div>;

  return (
    <ul>
      <li>
        <p>{details.name}</p>
      </li>
      <li>
        <p>{details.email}</p>
      </li>
    </ul>
  );
}
