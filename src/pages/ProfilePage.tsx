import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FiEdit2,
  FiEye,
  FiEyeOff,
  FiHeart,
  FiLock,
  FiLogOut,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <main className="min-h-screen bg-page px-4 py-10 transition-colors">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-[40px] font-bold text-foreground text-center mb-8">My Profile</h1>

        <div className="rounded-2xl border border-border bg-surface shadow-[0_2px_20px_rgba(15,23,42,0.04)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] p-6 transition-colors">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-muted-foreground font-semibold mx-auto">
              {initials}
            </div>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground cursor-pointer absolute top-0 right-0"
            >
              <FiEdit2 className="w-4 h-4" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <h2 className="text-center text-[30px] font-semibold text-foreground mt-4">
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
                <div className="rounded-xl bg-slate-100 dark:bg-slate-800/50 px-4 py-3 flex items-start gap-3 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-subtle border border-border/60">
                    <FiUser className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-subtle">
                      Full Name
                    </p>
                    {isEditing ? (
                      <Field
                        name="name"
                        type="text"
                        autoFocus
                        placeholder="Enter your full name"
                        className="w-full h-10 px-3 rounded-lg border border-border-strong bg-surface text-[14px] font-semibold text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                      />
                    ) : (
                      <p className="text-[14px] font-semibold text-foreground">{user.name}</p>
                    )}
                    {isEditing && touched.name && errors.name ? (
                      <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-100 dark:bg-slate-800/50 px-4 py-3 flex items-start gap-3 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-subtle border border-border/60">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-subtle">
                      Email Address
                    </p>
                    <p className="text-[14px] font-semibold text-foreground">{user.email}</p>
                    <p className="text-[12px] text-subtle mt-1">
                      Email cannot be changed from profile settings.
                    </p>
                  </div>
                </div>

                {isEditing ? (
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-accent-hover text-white text-[14px] font-medium hover:opacity-90 transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                ) : null}
              </Form>
            )}
          </Formik>

          <div className="mt-4 rounded-xl border border-border bg-surface-elevated/40 dark:bg-slate-800/40 p-4 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiLock className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-[14px] font-semibold text-foreground">Security</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordEditing((prev) => !prev)}
                className="text-[13px] font-medium text-accent cursor-pointer"
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
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                  resetForm();
                  setIsPasswordEditing(false);
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, touched }) => (
                  <Form className="mt-4 space-y-3">
                    <div>
                      <div className="relative">
                        <Field
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Current password"
                          className="w-full h-10 pl-3 pr-10 rounded-lg border border-border bg-surface text-[14px] text-foreground focus:outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                        >
                          {showCurrentPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {touched.currentPassword && errors.currentPassword ? (
                        <p className="text-red-500 text-[12px] mt-1">{errors.currentPassword}</p>
                      ) : null}
                    </div>

                    <div>
                      <div className="relative">
                        <Field
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New password"
                          className="w-full h-10 pl-3 pr-10 rounded-lg border border-border bg-surface text-[14px] text-foreground focus:outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                        >
                          {showNewPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {touched.newPassword && errors.newPassword ? (
                        <p className="text-red-500 text-[12px] mt-1">{errors.newPassword}</p>
                      ) : null}
                    </div>

                    <div>
                      <div className="relative">
                        <Field
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="w-full h-10 pl-3 pr-10 rounded-lg border border-border bg-surface text-[14px] text-foreground focus:outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        >
                          {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <p className="text-red-500 text-[12px] mt-1">{errors.confirmPassword}</p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full h-10 rounded-lg bg-accent-hover text-white text-[14px] font-medium hover:opacity-90 transition-colors cursor-pointer"
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
            className="w-full mt-4 h-11 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-[14px] font-semibold hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="rounded-2xl border border-border bg-surface p-5 transition-colors">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700 text-muted-foreground">
              <FiHeart className="w-4 h-4" />
            </div>
            <p className="text-[13px] text-muted-foreground mt-3">Favorites</p>
            <p className="text-[30px] leading-none font-bold text-foreground mt-2">
              {favoritesCount}
            </p>
            <p className="text-[12px] text-subtle mt-2">properties saved</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 transition-colors">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700 text-muted-foreground">
              <FiShield className="w-4 h-4" />
            </div>
            <p className="text-[13px] text-muted-foreground mt-3">Account Type</p>
            <p className="text-[32px] leading-none font-bold text-blue-600 dark:text-blue-400 mt-2">
              Premium
            </p>
            <p className="text-[12px] text-subtle mt-2">Full access to features</p>
          </div>
        </div>
      </section>
    </main>
  );
}
