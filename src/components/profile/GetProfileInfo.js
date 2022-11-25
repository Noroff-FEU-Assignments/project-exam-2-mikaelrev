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
        <Card className="p-3 bg-light ">
          <Card.Body>
            <Card.Title>{details.name}</Card.Title>
            <Row>
              <Col className="p-0 ">
                <Card.Img src={details.avatar} style={{ height: "5rem" }} />
              </Col>
              <Col xs={11} className="p-0">
                <Card.Img src={details.banner} style={{ height: "5rem" }} />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex gap-3">
                <Card.Text>{details.email}</Card.Text>
                <Card.Text>Posts: {details._count.posts}</Card.Text>
                <Card.Text>Following: {details._count.following}</Card.Text>
                <Card.Text>Followers: {details._count.followers}</Card.Text>
              </Col>
            </Row>

            <NavLink to="/update/:name">Update your avatar and banner</NavLink>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
