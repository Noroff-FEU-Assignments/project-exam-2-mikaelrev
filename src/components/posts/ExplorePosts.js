import { useState, useEffect } from "react";
import { Col, Row, ListGroup, Image } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { NavLink } from "react-router-dom";

export default function ExplorePosts() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await http.get("social/posts");
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="mt-3">
      <Heading content="Explore Posts" />
      <ListGroup>
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <Row className="d-flex">
                <Col xs={1}>
                  <Image
                    className="border rounded"
                    style={{
                      aspectRatio: "1/1",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={post.media}
                  ></Image>
                </Col>
                <Col xs={11}>
                  <NavLink to={`/details/${post.id}`}>{post.title}</NavLink>
                  <p className="m-0">tags: {post.tags}</p>
                  <p className="m-0">Comments: {post._count.comments}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}
