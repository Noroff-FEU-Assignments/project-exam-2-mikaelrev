import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import useAxios from "../../hooks/useAxios";

export default function ProfilesList({ register }) {
  const [profiles, setProfiles] = useState([]);

  const http = useAxios();

  useEffect(function () {
    async function getProfiles() {
      try {
        const response = await http.get("social/profiles");
        console.log("response", response);
        setProfiles(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {profiles.map((profile) => {
        return (
          <Card>
            <p key={profile.name}>{profile.name}</p>
          </Card>
        );
      })}
    </>
  );
}
