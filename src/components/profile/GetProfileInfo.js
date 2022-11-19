import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Card from "react-bootstrap/Card";

export default function GetProfileInfo() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function () {
    async function GetProfileInfo() {
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

    GetProfileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="loading">Loading pages...</div>;

  if (error) return <div>An error occurred</div>;

  return (
    <>
      <Card className="mt-5">
        <ul className="py-3">
          <li>
            <p>Name: {details.name}</p>
          </li>
          <li>
            <p>Email: {details.email}</p>
          </li>
          <li>
            <p>Posts: {details._count.posts}</p>
          </li>
          <li>
            <p>Followers: {details._count.followers}</p>
          </li>
          <li>
            <p>Following: {details._count.following}</p>
          </li>
        </ul>
      </Card>
    </>
  );
}
