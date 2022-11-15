import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, LOGIN_PATH } from "../../constants/api";
import { NavLink } from "react-router-dom";

const url = BASE_URL + LOGIN_PATH;

const schema = yup.object().shape({
  email: yup.string().required("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

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
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}
        <fieldset disabled={submitting}>
          <div>
            <input name="email" placeholder="Email" {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>

          <div>
            <input
              name="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>

          <button>{submitting ? "Logging in..." : "Login"}</button>
        </fieldset>
        <div>
          <NavLink to="/register">Not a user? Create an account here</NavLink>
        </div>
      </form>
    </>
  );
}
