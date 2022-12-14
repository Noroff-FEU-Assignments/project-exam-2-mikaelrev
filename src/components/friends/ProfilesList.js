import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { Col, Row, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const http = useAxios();

  useEffect(function () {
    async function ProfilesList() {
      try {
        const response = await http.get("social/profiles");
        console.log("response", response);
        setProfiles(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    ProfilesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading profiles...</div>;

  if (error)
    return (
      <div>There was an error when fetching profiles. Try again later</div>
    );

  return (
    <>
      <Row className="mt-3 text-center text-sm-start">
        <Heading content="Find new friends" />
      </Row>

      <Row className="mt-3 g-4">
        {profiles.map((profile) => (
          <Col xs={12} sm={6} md={4} lg={3} key={profile.name}>
            <Card>
              <Card.Img
                variant="top"
                src={profile.avatar}
                style={{
                  height: "15rem",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>
                  <NavLink to={`/profiles/${profile.name}`}>
                    <p>{profile.name}</p>
                  </NavLink>
                </Card.Title>
                <Card.Text>Posts: {profile._count.posts}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
