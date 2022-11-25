import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import { Container, Form, Col, Button } from "react-bootstrap";

const schema = yup.object().shape({
  banner: yup.string().optional,
  avatar: yup.string().optional,
});

export default function UpdateEntryMedia() {
  const [media, setMedia] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingMedia, setFetchingMedia] = useState(true);
  const [updatingMedia, setUpdatingMedia] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const http = useAxios();

  let { name } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = `social/profiles/${name}/media`;

  useEffect(
    function () {
      async function getMedia() {
        try {
          const response = await http.get(url);
          console.log("response", response.data);
          setMedia(response.data);
        } catch (error) {
          console.log(error);
          setFetchError(error.toString());
        } finally {
          setFetchingMedia(false);
        }
      }

      getMedia();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onSubmit(data) {
    setUpdatingMedia(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    const postData = {
      banner: data.banner,
      avatar: data.avatar,
    };

    try {
      const response = await http.put(url, postData);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingMedia(false);
    }
  }

  if (fetchingMedia) return <div>Loading...</div>;

  if (fetchError) return <div>Error Loading post</div>;

  return (
    <Container className="mt-3">
      <Col sm={8} className="mx-auto">
        <Form
          className="p-4 bg-light border rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading content="Update avatar and banner" />

          {updated && <Form.Text>{updated}</Form.Text>}
          {updateError && <FormError>{updateError}</FormError>}
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            disabled={updatingMedia}
          >
            <Form.Label>Banner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter banner URL"
              defaultValue={media.banner}
              {...register("banner")}
            />
            <Col>
              {errors.banner && (
                <Form.Text className="text-danger">
                  {errors.banner.message}
                </Form.Text>
              )}
            </Col>

            <Form.Label className="mt-3">Avatar</Form.Label>
            <Form.Control
              style={{ height: "100px" }}
              type="text"
              placeholder="Enter avatar URL"
              defaultValue={media.avatar}
              {...register("avatar")}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}
