import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Card, Col, Row } from "react-bootstrap/";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function GetProfileInfo() {
  const auth = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { name } = useParams();

  if (auth) {
    name = auth[0].name;
  }

  const url = `social/profiles/${name}?_following=true&_followers=true`;

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
    <Col>
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

          <Row className="my-3">
            <NavLink to="/update/:name">Update your avatar and banner</NavLink>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
