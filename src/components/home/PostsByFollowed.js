import { useState, useEffect } from "react";
import { Col, Row, ListGroup, Image } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { NavLink } from "react-router-dom";
import Heading from "../layout/Heading";

export default function PostsByFollowed() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await http.get("social/posts/following");
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
    <Col className="mt-3 mb-5">
      <Heading size="2" content="Posts by people you follow" />
      <ListGroup className="containers">
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <Row className="p-3 text-center text-sm-start">
                <Col sm={4} lg={2}>
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
                <Col sm={8} lg={10}>
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
