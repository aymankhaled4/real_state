import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FiEdit2, FiHeart, FiLock, FiLogOut, FiMail, FiShield, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import AuthContext from "../context/AuthContext";
import { getUserFavorites } from "../api/favoritesApi";

const profileValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters")
    .required("Name is required"),
});

const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfileHandler, updatePasswordHandler, logoutHandler } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
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

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
            initialValues={{ name: user.name }}
            validationSchema={profileValidationSchema}
            onSubmit={async (values) => {
              const updated = await updateProfileHandler(values.name, user.email);
              if (!updated) {
                return;
              }
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
                    <p className="text-[14px] font-semibold text-[#111827]">{user.email}</p>
                    <p className="text-[12px] text-[#9ca3af] mt-1">
                      Email cannot be changed from profile settings.
                    </p>
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

          <div className="mt-4 rounded-xl border border-[#eef0f5] bg-[#fbfcff] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiLock className="w-4 h-4 text-[#6b7280]" />
                <h3 className="text-[14px] font-semibold text-[#111827]">Security</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordEditing((prev) => !prev)}
                className="text-[13px] font-medium text-[#047857] cursor-pointer"
              >
                {isPasswordEditing ? "Cancel" : "Change Password"}
              </button>
            </div>

            {isPasswordEditing ? (
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={passwordValidationSchema}
                onSubmit={async (values, { resetForm }) => {
                  const changed = await updatePasswordHandler(
                    values.currentPassword,
                    values.newPassword
                  );
                  if (!changed) {
                    return;
                  }
                  resetForm();
                  setIsPasswordEditing(false);
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, touched }) => (
                  <Form className="mt-4 space-y-3">
                    <div>
                      <Field
                        name="currentPassword"
                        type="password"
                        placeholder="Current password"
                        className="w-full h-10 px-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0B1C30] focus:outline-none focus:border-[#047857]"
                      />
                      {touched.currentPassword && errors.currentPassword ? (
                        <p className="text-red-500 text-[12px] mt-1">{errors.currentPassword}</p>
                      ) : null}
                    </div>

                    <div>
                      <Field
                        name="newPassword"
                        type="password"
                        placeholder="New password"
                        className="w-full h-10 px-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0B1C30] focus:outline-none focus:border-[#047857]"
                      />
                      {touched.newPassword && errors.newPassword ? (
                        <p className="text-red-500 text-[12px] mt-1">{errors.newPassword}</p>
                      ) : null}
                    </div>

                    <div>
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full h-10 px-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0B1C30] focus:outline-none focus:border-[#047857]"
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <p className="text-red-500 text-[12px] mt-1">{errors.confirmPassword}</p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full h-10 rounded-lg bg-[#131b2e] text-white text-[14px] font-medium hover:bg-[#1b2743] transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </Form>
                )}
              </Formik>
            ) : null}
          </div>

          <button
            type="button"
            onClick={logoutHandler}
            className="w-full mt-4 h-11 rounded-xl border border-[#fecaca] bg-[#fff5f5] text-[#b91c1c] text-[14px] font-semibold hover:bg-[#ffe7e7] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
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
