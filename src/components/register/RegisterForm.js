import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL } from "../../constants/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
  avatar: yup.string().optional("Enter url for your avatar"),
  banner: yup.string().optional("Enter url for your banner"),
});

export default function RegisterForm() {
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
        {registerError && <FormError>{registerError}</FormError>}
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          disabled={submitting}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="mb-3"
            type="name"
            placeholder="Enter name"
            {...register("name")}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}

          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}

          <Form.Label>Password</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}

          <Form.Label>Avatar URL</Form.Label>
          <Form.Control
            className="mb-3"
            type="avatar"
            placeholder="Enter avatar URL (optional)"
            {...register("avatar")}
          />
          {errors.avatar && <FormError>{errors.avatar.message}</FormError>}

          <Form.Label>Banner URL</Form.Label>
          <Form.Control
            className="mb-3"
            type="banner"
            placeholder="Enter Banner URL (optional)"
            {...register("banner")}
          />
          {errors.banner && <FormError>{errors.banner.message}</FormError>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
