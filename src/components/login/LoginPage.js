import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL } from "../../constants/api";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Container, Row, Form, Button } from "react-bootstrap";
import Heading from "../layout/Heading";

const url = BASE_URL + "social/auth/login";

const schema = yup.object().shape({
  email: yup.string().required("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      navigate("/my-profile");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="mt-3 w-75">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading content="Log in" />
        {loginError && <FormError>{loginError}</FormError>}
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          disabled={submitting}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <Row>
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Row>

          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Row>
            {errors.password && (
              <Form.Text className="text-danger">
                {errors.password.message}
              </Form.Text>
            )}
          </Row>
        </Form.Group>
        <Button variant="success" type="submit">
          Log in
        </Button>
        <Row>
          <NavLink to="/register">Not a user? Create an account here</NavLink>
        </Row>
      </Form>
    </Container>
  );
}
