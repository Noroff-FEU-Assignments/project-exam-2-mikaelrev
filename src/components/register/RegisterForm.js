import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL } from "../../constants/api";

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
            <input name="name" placeholder="Name" {...register("name")} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>

          <div>
            <input
              name="avatar"
              placeholder="Avatar URL (optional)"
              {...register("avatar")}
            />
            {errors.avatar && <FormError>{errors.avatar.message}</FormError>}
          </div>

          <div>
            <input
              name="banner"
              placeholder="Banner URL (optional)"
              {...register("banner")}
            />
            {errors.banner && <FormError>{errors.banner.message}</FormError>}
          </div>

          <button>Register</button>
        </fieldset>
      </form>
    </>
  );
}
