import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ChatPage from "./pages/chat/ChatPage";
import BlogPage from "./pages/blog/BlogPage";
import SingleBlogPost from "./pages/blog/SingleBlogPost";
import ConsultationPage from "./pages/consultation/ConsultationPage";
import ContactPage from "./pages/contact/ContactPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProfileLayout from "./pages/profile/ProfileLayout";
import ProfileInfo from "./pages/profile/components/ProfileInfo";
import Appointments from "./pages/profile/components/Appointments";
import MedicalRecords from "./pages/profile/components/MedicalRecords";
import TestResults from "./pages/profile/components/TestResults";
import NotificationSettings from "./pages/profile/components/NotificationSettings";
import PrivacySettings from "./pages/profile/components/PrivacySettings";
import OrderTests from "./pages/profile/components/OrderTests";
import ErrorPage from "./pages/ErrorPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Patients from "./pages/admin/Patients";
import AdminAppointments from "./pages/admin/Appointments";
import Doctors from "./pages/admin/Doctors";
import Billings from "./pages/admin/Billings";
import Settings from "./pages/admin/Settings";
import Reports from "./pages/admin/Reports";
import { AuthProvider } from "./lib/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingConfirmation from "./pages/consultation/steps/BookingConfirmation";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* Auth routes */}
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />

            {/* Main app routes */}
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<SingleBlogPost />} />
            <Route path="consultation" element={<ConsultationPage />} />
            <Route
              path="consultation/confirmation"
              element={<BookingConfirmation />}
            />
            <Route path="contact" element={<ContactPage />} />

            {/* Profile routes */}
            <Route path="profile" element={<ProfileLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfileInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="appointments"
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="medical-records"
                element={
                  <ProtectedRoute>
                    <MedicalRecords />
                  </ProtectedRoute>
                }
              />
              <Route
                path="test-results"
                element={
                  <ProtectedRoute>
                    <TestResults />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notifications"
                element={
                  <ProtectedRoute>
                    <NotificationSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="privacy"
                element={
                  <ProtectedRoute>
                    <PrivacySettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="order-tests"
                element={
                  <ProtectedRoute>
                    <OrderTests />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          {/* Admin Section */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="billings" element={<Billings />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
