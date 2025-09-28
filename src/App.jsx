import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import GeneratorPage from "./pages/GeneratorPage";
import GeneratorPageV2 from "./pages/GeneratorPageV2";
import GeneratorPageV3 from "./pages/GeneratorPageV3";
import TemplatesPage from "./pages/TemplatesPage";
import TemplatesPageV2 from "./pages/TemplatesPageV2";
import TemplatesPageV3 from "./pages/TemplatesPageV3";
import StatisticsPage from "./pages/StatisticsPage";
import PricingPage from "./pages/PricingPage";
import TemplateCustomizationPage from "./pages/TemplateCustomizationPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 보호된 라우트들 */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <TemplatesPageV3 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/templates-v2"
            element={
              <ProtectedRoute>
                <TemplatesPageV2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/templates-v3"
            element={
              <ProtectedRoute>
                <TemplatesPageV3 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <GeneratorPageV3 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-v3"
            element={
              <ProtectedRoute>
                <GeneratorPageV3 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-old"
            element={
              <ProtectedRoute>
                <GeneratorPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <StatisticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pricing"
            element={
              <ProtectedRoute>
                <PricingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customization"
            element={
              <ProtectedRoute>
                <TemplateCustomizationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      {/* Speed Insights를 Router 밖에 배치 */}
      <SpeedInsights />
    </>
  );
}

export default App;
