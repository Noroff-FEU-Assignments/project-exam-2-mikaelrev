import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Col, ListGroup, Row, Tabs, Tab } from "react-bootstrap/";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";

export default function GetFollowers() {
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
    async function GetFollowers() {
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

    GetFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="loading">Loading pages...</div>;

  if (error) return <div>An error occurred</div>;

  return (
    <Col lg className="mt-3">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Following">
          <ListGroup className="containers">
            {details.following.map(function (following) {
              return (
                <ListGroup.Item key={following.name}>
                  <Row>
                    <Col sm={8}>
                      <NavLink to={`/profiles/${following.name}`}>
                        {following.name}
                      </NavLink>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Tab>
        <Tab eventKey="profile" title="Followers">
          <ListGroup className="containers">
            {details.followers.map(function (followers) {
              return (
                <ListGroup.Item key={followers.name}>
                  <Row>
                    <Col sm={8}>
                      <NavLink to={`/profiles/${followers.name}`}>
                        {followers.name}
                      </NavLink>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Tab>
      </Tabs>
    </Col>
  );
}
