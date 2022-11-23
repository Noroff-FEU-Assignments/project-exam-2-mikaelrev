import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap/";
import Heading from "../layout/Heading";

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
      <Container className="p-0 my-5">
        <Heading content="Info" />
        <ListGroup>
          <ListGroupItem>
            <p>Name: {details.name}</p>
          </ListGroupItem>
          <ListGroupItem>
            <p>Email: {details.email}</p>
          </ListGroupItem>
          <ListGroupItem>
            <p>Posts: {details._count.posts}</p>
          </ListGroupItem>
          <ListGroupItem>
            <p>Followers: {details._count.followers}</p>
          </ListGroupItem>
          <ListGroupItem>
            <p>Following: {details._count.following}</p>
          </ListGroupItem>
        </ListGroup>
      </Container>
    </>
  );
}
