import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { ListGroup, Container, Card, Row, Col } from "react-bootstrap";

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
    <Container className="mt-3">
      <Heading content="Find new friends" />
      <Card className="mt-3">
        <Card.Header>People you might know</Card.Header>

        {profiles.map((profile) => {
          return (
            <ListGroup>
              <ListGroup.Item key={profile.id}>
                <Row>
                  <Col>
                    <p>{profile.name}</p>
                    <p>View profile</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </Card>
    </Container>
  );
}
