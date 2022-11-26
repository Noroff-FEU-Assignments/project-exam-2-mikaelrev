import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Container, Col, Row, Card } from "react-bootstrap/";
import Heading from "../layout/Heading";
import MakeComment from "./MakeComment";

export default function GetPostDetails() {
  const [details, setDetails] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { id } = useParams();

  const url = `social/posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(function () {
    async function GetPostDetails() {
      try {
        const response = await http.get(url);
        console.log("response", response.data);
        setDetails(response.data);
        setReactions(response.data.reactions);
        setComments(response.data.comments);
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
    <Container>
      <Row className="mt-3 d-flex flex-column">
        <Col>
          <Heading content={details.title} />
          <Card>
            <Card.Body>
              <Card.Title>{details.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {details.created}
              </Card.Subtitle>
              <Card.Text>{details.body}</Card.Text>
              {reactions.map(function (reaction) {
                return <>{reaction.symbol}</>;
              })}

              <Heading size="2" content="Comments" />

              <MakeComment />

              <Card>
                {comments ? (
                  <>
                    {comments.map(function (comment) {
                      return (
                        <Card.Body key={comment.id}>
                          <Card.Title>{comment.owner}</Card.Title>
                          <Card.Text>{comment.body}</Card.Text>
                        </Card.Body>
                      );
                    })}
                  </>
                ) : (
                  <Card.body>
                    <Card.Title>No comments</Card.Title>
                  </Card.body>
                )}
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
