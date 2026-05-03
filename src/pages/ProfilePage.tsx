import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { FiEdit2, FiHeart, FiMail, FiShield, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import AuthContext from "../context/AuthContext";
import { getUserFavorites } from "../api/favoritesApi";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfileHandler } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.id) {
        setFavoritesCount(0);
        return;
      }

      const favorites = await getUserFavorites(user.id);
      setFavoritesCount(favorites.length);
    };

    void loadFavorites();
  }, [user?.id]);

  const initials = useMemo(() => {
    if (!user?.name) {
      return "U";
    }

    return user.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user?.name]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-[40px] font-bold text-[#111827] text-center mb-8">My Profile</h1>

        <div className="rounded-2xl border border-[#eef0f5] bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] p-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#ececf1] flex items-center justify-center text-[#4b5563] font-semibold mx-auto">
              {initials}
            </div>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex items-center gap-2 text-[13px] text-[#374151] cursor-pointer absolute top-0 right-0"
            >
              <FiEdit2 className="w-4 h-4" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <h2 className="text-center text-[30px] font-semibold text-[#111827] mt-4">
            {user.name}
          </h2>

          <Formik
            initialValues={{ name: user.name, email: user.email }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await updateProfileHandler(values.name, values.email);
              setIsEditing(false);
            }}
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, touched }) => (
              <Form className="mt-5 space-y-3">
                <div className="rounded-xl bg-[#f5f6fa] px-4 py-3 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#9ca3af]">
                    <FiUser className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
                      Full Name
                    </p>
                    {isEditing ? (
                      <Field
                        name="name"
                        type="text"
                        className="w-full bg-transparent text-[14px] font-semibold text-[#111827] focus:outline-none"
                      />
                    ) : (
                      <p className="text-[14px] font-semibold text-[#111827]">{user.name}</p>
                    )}
                    {isEditing && touched.name && errors.name ? (
                      <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-xl bg-[#f5f6fa] px-4 py-3 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#9ca3af]">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
                      Email Address
                    </p>
                    {isEditing ? (
                      <Field
                        name="email"
                        type="email"
                        className="w-full bg-transparent text-[14px] font-semibold text-[#111827] focus:outline-none"
                      />
                    ) : (
                      <p className="text-[14px] font-semibold text-[#111827]">{user.email}</p>
                    )}
                    {isEditing && touched.email && errors.email ? (
                      <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                {isEditing ? (
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-[#131b2e] text-white text-[14px] font-medium hover:bg-[#1b2743] transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="rounded-2xl border border-[#eef0f5] bg-white p-5">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#f5f6fa] text-[#6b7280]">
              <FiHeart className="w-4 h-4" />
            </div>
            <p className="text-[13px] text-[#4b5563] mt-3">Favorites</p>
            <p className="text-[30px] leading-none font-bold text-[#0f172a] mt-2">
              {favoritesCount}
            </p>
            <p className="text-[12px] text-[#9ca3af] mt-2">properties saved</p>
          </div>

          <div className="rounded-2xl border border-[#eef0f5] bg-white p-5">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#f5f6fa] text-[#6b7280]">
              <FiShield className="w-4 h-4" />
            </div>
            <p className="text-[13px] text-[#4b5563] mt-3">Account Type</p>
            <p className="text-[32px] leading-none font-bold text-[#2563eb] mt-2">Premium</p>
            <p className="text-[12px] text-[#9ca3af] mt-2">Full access to features</p>
          </div>
        </div>
      </section>
    </main>
  );
}
