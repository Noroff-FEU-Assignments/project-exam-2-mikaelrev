import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL } from "../../constants/api";
import { Button, Form, Col } from "react-bootstrap";
import Heading from "../layout/Heading";

const url = BASE_URL + "social/auth/register";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .required("Please enter a valid stud.noroff.no or noroff.no email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "The password must be at least 8 characters"),
  avatar: yup.string("Enter URL for your avatar"),
  banner: yup.string("Enter URL for your banner"),
});

export default function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line

  async function onSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setRegisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading content="Register" />
        {registerError && <FormError>{registerError}</FormError>}
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          disabled={submitting}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            {...register("name")}
          />
          <Col>
            {errors.name && (
              <Form.Text className="text-danger">
                {errors.name.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <Col>
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Col>
            {errors.password && (
              <Form.Text className="text-danger">
                {errors.password.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Avatar URL</Form.Label>
          <Form.Control
            type="avatar"
            placeholder="Enter avatar URL (optional)"
            {...register("avatar")}
          />
          <Col>
            {errors.avatar && (
              <Form.Text className="text-danger">
                {errors.avatar.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Banner URL</Form.Label>
          <Form.Control
            type="banner"
            placeholder="Enter Banner URL (optional)"
            {...register("banner")}
          />
          <Col>
            {errors.banner && (
              <Form.Text className="text-danger">
                {errors.banner.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
