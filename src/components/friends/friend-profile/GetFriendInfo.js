import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { Card, Col } from "react-bootstrap/";

export default function GetProfileInfo() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { name } = useParams();

  const url = `social/profiles/${name}`;

  useEffect(function () {
    async function GetProfileInfo() {
      try {
        const response = await http.get(url);
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
      <Col>
        <Card
          className="p-3 bg-light border rounded"
          style={{ width: "18rem" }}
        >
          <Card.Body>
            <Card.Title>{details.name}</Card.Title>
            <Card.Img variant="top" src={details.avatar} />
            <Card.Text>{details.email}</Card.Text>
            <Card.Text>Posts: {details._count.posts}</Card.Text>
            <Card.Text>Following: {details._count.following}</Card.Text>
            <Card.Text>Followers: {details._count.followers}</Card.Text>
            <Card.Link href="#">Follow</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}