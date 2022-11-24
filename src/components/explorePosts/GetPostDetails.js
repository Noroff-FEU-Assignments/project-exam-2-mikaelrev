import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Container, Card } from "react-bootstrap/";

export default function GetPostDetails() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { id } = useParams();

  const url = `social/posts/${id}`;

  useEffect(function () {
    async function GetPostDetails() {
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

    GetPostDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="loading">Loading pages...</div>;

  if (error) return <div>An error occurred</div>;

  return (
    <>
      <Container className="p-0 mt-3">
        <Card>
          <Card.Body>
            <Card.Title>{details.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {details.created}
            </Card.Subtitle>
            <Card.Text>{details.body}</Card.Text>
            <Card.Text>Comments: {details._count.comments}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
