import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { ListGroup, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);

  const http = useAxios();

  useEffect(function () {
    async function ProfilesList() {
      try {
        const response = await http.get("social/profiles");
        console.log("response", response);
        setProfiles(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    ProfilesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="mt-3">
      <Heading content="Find new friends" />
      <ListGroup>
        {profiles.map((profile) => {
          return (
            <ListGroup.Item key={profile.name}>
              <NavLink to={`/profiles/${profile.name}`}>{profile.name}</NavLink>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}
