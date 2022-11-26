import { useState, useEffect, useContext } from "react";
import { Col, Row, ListGroup, Image } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { NavLink, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function GetProfilePosts() {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  let { name } = useParams();

  if (auth) {
    name = auth[0].name;
  }

  const url = `social/profiles/${name}/posts`;

  useEffect(function () {
    async function GetProfilePosts() {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    GetProfilePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="mt-3">
      <Heading size="2" content="Explore Posts" />
      <ListGroup>
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <Row className="align-items-center">
                <Col xs={6}>
                  <NavLink to={`/details/${post.id}`}>{post.title}</NavLink>
                  <p className="m-0">tags: {post.tags}</p>
                </Col>
                <Col xs={6}>
                  <NavLink to={`/edit/${post.id}`}>Edit post</NavLink>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}
