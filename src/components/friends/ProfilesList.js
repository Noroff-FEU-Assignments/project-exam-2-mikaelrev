import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { Col, Row, ListGroup, Image } from "react-bootstrap";
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
              <Row className="p-3 text-center text-sm-start">
                <Col sm md={3}>
                  <NavLink to={`/profiles/${profile.name}`}>
                    <Image
                      className="border rounded"
                      style={{
                        height: "5rem",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      src={profile.avatar}
                    ></Image>
                  </NavLink>
                </Col>
                <Col sm md={9}>
                  <NavLink to={`/profiles/${profile.name}`}>
                    <p>{profile.name}</p>
                  </NavLink>
                  <p>Posts: {profile._count.posts}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}
