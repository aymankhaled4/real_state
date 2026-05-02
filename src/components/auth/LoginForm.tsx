import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
});

function LoginForm() {
  const { loginHandler } = useContext(AuthContext);

  const initialValues = { email: "", password: "" };

  const onSubmit = async (values: { email: string; password: string }) => {
    await loginHandler(values.email, values.password);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form className="flex flex-col gap-4">
        <div>
          <Field
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-[#0B1C30] focus:outline-none focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/10"
          />
          <ErrorMessage name="email" component="p" className="text-red-500 text-[12px] mt-1" />
        </div>

        <div>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-[#0B1C30] focus:outline-none focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/10"
          />
          <ErrorMessage name="password" component="p" className="text-red-500 text-[12px] mt-1" />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-[#131b2e] text-white text-[14px] font-medium rounded-xl hover:bg-[#1b2743] transition-colors cursor-pointer mt-2"
        >
          Sign in
        </button>
      </Form>
    </Formik>
  );
}

export default LoginForm;