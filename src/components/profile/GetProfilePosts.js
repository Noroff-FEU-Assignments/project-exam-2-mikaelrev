import { useState, useEffect, useContext } from "react";
import { Col, ListGroup } from "react-bootstrap";
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
    <Col className="mt-3 mb-5">
      <Heading size="2" content="All posts" />
      <ListGroup>
        {posts.map((post) => {
          return (
            <ListGroup.Item
              className="d-flex align-items-center gap-5 p-3"
              key={post.id}
            >
              <div>
                <p className="m-0">{post.title}</p>
              </div>

              <div>
                <NavLink to={`/details/${post.id}`}>Go to post</NavLink>
              </div>
              <div>
                <NavLink to={`/edit/${post.id}`}>Edit post</NavLink>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}
