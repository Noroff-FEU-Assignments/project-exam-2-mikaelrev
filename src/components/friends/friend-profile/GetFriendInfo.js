import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { Card, Col, Row } from "react-bootstrap/";
import FollowProfile from "./FollowProfile";

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

  if (loading) return <div className="loading">Loading profile info</div>;

  if (error)
    return (
      <div>An error occurred when fetching profile info. Try again later</div>
    );

  return (
    <Col className="p-3 text-center text-sm-start">
      <Card className="p-3 bg-light ">
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{details.name}</Card.Title>
            </Col>
          </Row>

          <Row>
            <Col md={3} className="order-md-first">
              <Card.Img
                src={details.avatar}
                style={{
                  height: "7.5rem",
                  width: "7.5rem",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col md={9} className="d-none d-md-block">
              <Card.Img
                src={details.banner}
                style={{
                  height: "7.5rem",
                  objectFit: "cover",
                }}
              />
            </Col>
          </Row>

          <Row>
            <Row className="mt-3">
              <Col md lg={5}>
                <Card.Text>{details.email}</Card.Text>
              </Col>
              <Col md lg={2}>
                <Card.Text>Posts: {details._count.posts}</Card.Text>
              </Col>
              <Col md lg={2}>
                <Card.Text>Following: {details._count.following}</Card.Text>
              </Col>
              <Col md lg={2}>
                <Card.Text>Followers: {details._count.followers}</Card.Text>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FollowProfile name={details.name} />
              </Col>
            </Row>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
