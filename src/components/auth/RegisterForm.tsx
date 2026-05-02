import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";


const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "name must be at least 3 characters")
    .max(20, "name must be at most 20 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
});

function RegisterForm() {
  const { registerHandler } = useContext(AuthContext);

  const initialValues = { name:"", email: "", password: "" };

  const onSubmit = async (values: { name: string; email: string; password: string }) => {
    await registerHandler(values.name,values.email, values.password);
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
            name="name"
            type="text"
            placeholder="Name"
            className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-[#0B1C30] focus:outline-none focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/10"
          />
          <ErrorMessage name="name" component="p" className="text-red-500 text-[12px] mt-1" />
        </div>

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
          Create account
        </button>
      </Form>
    </Formik>
  );
}

export default RegisterForm