import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import FoodSafety from './pages/FoodSafety';
import Licenses from './pages/Licenses';
import Documents from './pages/Documents';
import Insurance from './pages/Insurance';
import PricingPage from './pages/PricingPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import BetaPage from './pages/BetaPage';
import EHOInspectorBot from './pages/EHOInspectorBot';
import SFBBGenerator from './pages/SFBBGenerator';
import ComplianceScore from './pages/ComplianceScore';
import SeasonalAlerts from './pages/SeasonalAlerts';
import InvoiceReminders from './pages/InvoiceReminders';
import MenuProfitAnalyzer from './pages/MenuProfitAnalyzer';
import Onboarding from './pages/Onboarding';
import DynamicPricingAdvisor from './pages/DynamicPricingAdvisor';
import WasteToProfitEngine from './pages/WasteToProfitEngine';
import AIRiskPredictor from './pages/AIRiskPredictor';
import AutoIncidentReportGenerator from './pages/AutoIncidentReportGenerator';
import AllergenScanner from './pages/AllergenScanner';
import WhatIfSimulator from './pages/WhatIfSimulator';
import StaffBehavior from './pages/StaffBehavior';
import ProfitLeakDetector from './pages/ProfitLeakDetector';
import ComplianceRevenueDashboard from './pages/ComplianceRevenueDashboard';
import MultiBranch from './pages/MultiBranch';
import SupplierPriceTracker from './pages/SupplierPriceTracker';
import POSIntegration from './pages/POSIntegration';
import TaxSummary from './pages/TaxSummary';
import RatingBooster from './pages/RatingBooster';
import TrustBadge from './pages/TrustBadge';
import CompetitorBenchmarking from './pages/CompetitorBenchmarking';
import ReviewIntelligence from './pages/ReviewIntelligence';

// Page wrapper to remove Layout import from individual pages
function PageWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/beta" element={<BetaPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/cancel" element={<CheckoutCancel />} />

      {/* Protected Routes - All use AppLayout for consistent layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/food-safety" element={
        <ProtectedRoute>
          <FoodSafety />
        </ProtectedRoute>
      } />
      <Route path="/licenses" element={
        <ProtectedRoute>
          <Licenses />
        </ProtectedRoute>
      } />
      <Route path="/documents" element={
        <ProtectedRoute>
          <Documents />
        </ProtectedRoute>
      } />
      <Route path="/insurance" element={
        <ProtectedRoute>
          <Insurance />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/eho-bot" element={
        <ProtectedRoute>
          <EHOInspectorBot />
        </ProtectedRoute>
      } />
      <Route path="/sfbb" element={
        <ProtectedRoute>
          <SFBBGenerator />
        </ProtectedRoute>
      } />
      <Route path="/compliance-score" element={
        <ProtectedRoute>
          <ComplianceScore />
        </ProtectedRoute>
      } />
      <Route path="/seasonal-alerts" element={
        <ProtectedRoute>
          <SeasonalAlerts />
        </ProtectedRoute>
      } />
      <Route path="/invoices" element={
        <ProtectedRoute>
          <InvoiceReminders />
        </ProtectedRoute>
      } />
      <Route path="/menu-analyzer" element={
        <ProtectedRoute>
          <MenuProfitAnalyzer />
        </ProtectedRoute>
      } />
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      <Route path="/dynamic-pricing" element={
        <ProtectedRoute>
          <DynamicPricingAdvisor />
        </ProtectedRoute>
      } />
      <Route path="/waste-profit" element={
        <ProtectedRoute>
          <WasteToProfitEngine />
        </ProtectedRoute>
      } />
      <Route path="/ai-risk-predictor" element={
        <ProtectedRoute>
          <AIRiskPredictor />
        </ProtectedRoute>
      } />
      <Route path="/incident-reports" element={
        <ProtectedRoute>
          <AutoIncidentReportGenerator />
        </ProtectedRoute>
      } />
      <Route path="/allergen-scanner" element={
        <ProtectedRoute>
          <AllergenScanner />
        </ProtectedRoute>
      } />
      <Route path="/what-if-simulator" element={
        <ProtectedRoute>
          <WhatIfSimulator />
        </ProtectedRoute>
      } />
      <Route path="/staff-behavior" element={
        <ProtectedRoute>
          <StaffBehavior />
        </ProtectedRoute>
      } />
      <Route path="/profit-leak-detector" element={
        <ProtectedRoute>
          <ProfitLeakDetector />
        </ProtectedRoute>
      } />
      <Route path="/compliance-revenue" element={
        <ProtectedRoute>
          <ComplianceRevenueDashboard />
        </ProtectedRoute>
      } />
      <Route path="/multi-branch" element={
        <ProtectedRoute>
          <MultiBranch />
        </ProtectedRoute>
      } />
      <Route path="/supplier-tracker" element={
        <ProtectedRoute>
          <SupplierPriceTracker />
        </ProtectedRoute>
      } />
      <Route path="/pos-integration" element={
        <ProtectedRoute>
          <POSIntegration />
        </ProtectedRoute>
      } />
      <Route path="/tax-summary" element={
        <ProtectedRoute>
          <TaxSummary />
        </ProtectedRoute>
      } />
      <Route path="/rating-booster" element={
        <ProtectedRoute>
          <RatingBooster />
        </ProtectedRoute>
      } />
      <Route path="/trust-badge" element={
        <ProtectedRoute>
          <TrustBadge />
        </ProtectedRoute>
      } />
      <Route path="/competitor-benchmarking" element={
        <ProtectedRoute>
          <CompetitorBenchmarking />
        </ProtectedRoute>
      } />
      <Route path="/review-intelligence" element={
        <ProtectedRoute>
          <ReviewIntelligence />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
    return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <AppRoutes />
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;