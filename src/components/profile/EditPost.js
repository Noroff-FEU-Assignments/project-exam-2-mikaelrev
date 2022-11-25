import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import { Container, Form, Col, Button } from "react-bootstrap";
import DeletePost from "./DeletePost";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function CreatePost() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  let { id } = useParams();

  const url = `social/posts/${id}`;
  useEffect(
    function () {
      async function getPost() {
        try {
          const response = await http.get(url);
          console.log("response", response.data);
          setPost(response.data);
        } catch (error) {
          console.log(error);
          setFetchError(error.toString());
        } finally {
          setFetchingPost(false);
        }
      }

      getPost();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    const postData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(","),
      media: data.media,
    };

    try {
      const response = await http.put(url, postData);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <div>Loading...</div>;

  if (fetchError) return <div>Error Loading post</div>;

  return (
    <Container className="mt-3">
      <Col sm={8} className="mx-auto">
        <Form
          className="p-4 bg-light border rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading content="Edit post" />

          {updated && <Form.Text>{updated}</Form.Text>}
          {updateError && <FormError>{updateError}</FormError>}
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            disabled={updatingPost}
          >
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              defaultValue={post.title}
              {...register("title")}
            />
            <Col>
              {errors.title && (
                <Form.Text className="text-danger">
                  {errors.title.message}
                </Form.Text>
              )}
            </Col>

            <Form.Label className="mt-3">Content</Form.Label>
            <Form.Control
              style={{ height: "100px" }}
              type="text"
              placeholder="Enter content"
              defaultValue={post.body}
              {...register("body")}
            />
            <Col>
              {errors.body && (
                <Form.Text className="text-danger">
                  {errors.body.message}
                </Form.Text>
              )}
            </Col>

            <Form.Label className="mt-3">Tags (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              defaultValue={post.tags}
              {...register("tags")}
            />
            <Col>
              {errors.tags && (
                <Form.Text className="text-danger">
                  {errors.tags.message}
                </Form.Text>
              )}
            </Col>

            <Form.Label className="mt-3">Image (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              defaultValue={post.media}
              {...register("media")}
            />
            <Col>
              {errors.media && (
                <Form.Text className="text-danger">
                  {errors.media.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>
          <Col className="d-flex gap-3">
            <Button variant="success" type="submit">
              Submit
            </Button>
            <DeletePost id={post.id} />
          </Col>
        </Form>
      </Col>
    </Container>
  );
}
