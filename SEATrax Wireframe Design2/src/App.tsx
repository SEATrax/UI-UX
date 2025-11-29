import { useState } from 'react';
import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import ExporterOnboarding from './components/ExporterOnboarding';
import InvestorOnboarding from './components/InvestorOnboarding';
import ExporterDashboard from './components/ExporterDashboard';
import InvoiceTokenization from './components/InvoiceTokenization';
import InvestorDashboard from './components/InvestorDashboard';
import PoolDetail from './components/PoolDetail';
import InvestmentFlow from './components/InvestmentFlow';
import ExporterWithdrawal from './components/ExporterWithdrawal';
import InvestorPaymentTracking from './components/InvestorPaymentTracking';
import AddInvestment from './components/AddInvestment';

type Page = 
  | 'landing'
  | 'role-selection'
  | 'exporter-onboarding'
  | 'investor-onboarding'
  | 'exporter-dashboard'
  | 'invoice-tokenization'
  | 'investor-dashboard'
  | 'pool-detail'
  | 'investment-flow'
  | 'exporter-withdrawal'
  | 'investor-payment-tracking'
  | 'add-investment';

type UserRole = 'exporter' | 'investor' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedPoolId, setSelectedPoolId] = useState<string>('');

  const handleRoleSelect = (role: 'exporter' | 'investor') => {
    setUserRole(role);
    if (role === 'exporter') {
      setCurrentPage('exporter-onboarding');
    } else {
      setCurrentPage('investor-onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    if (userRole === 'exporter') {
      setCurrentPage('exporter-dashboard');
    } else {
      setCurrentPage('investor-dashboard');
    }
  };

  const handlePoolSelect = (poolId: string) => {
    setSelectedPoolId(poolId);
    setCurrentPage('pool-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {currentPage === 'landing' && (
          <LandingPage 
            onGetStarted={() => setCurrentPage('role-selection')}
          />
        )}
        
        {currentPage === 'role-selection' && (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        )}
        
        {currentPage === 'exporter-onboarding' && (
          <ExporterOnboarding 
            onComplete={handleOnboardingComplete}
            onBack={() => setCurrentPage('role-selection')}
          />
        )}
        
        {currentPage === 'investor-onboarding' && (
          <InvestorOnboarding 
            onComplete={handleOnboardingComplete}
            onBack={() => setCurrentPage('role-selection')}
          />
        )}
        
        {currentPage === 'exporter-dashboard' && (
          <ExporterDashboard 
            onCreateInvoice={() => setCurrentPage('invoice-tokenization')}
            onWithdraw={() => setCurrentPage('exporter-withdrawal')}
          />
        )}
        
        {currentPage === 'invoice-tokenization' && (
          <InvoiceTokenization 
            onComplete={() => setCurrentPage('exporter-dashboard')}
            onBack={() => setCurrentPage('exporter-dashboard')}
          />
        )}
        
        {currentPage === 'investor-dashboard' && (
          <InvestorDashboard 
            onPoolSelect={handlePoolSelect}
            onViewPayments={() => setCurrentPage('investor-payment-tracking')}
            onAddInvestment={() => setCurrentPage('add-investment')}
          />
        )}
        
        {currentPage === 'pool-detail' && (
          <PoolDetail 
            poolId={selectedPoolId}
            onInvest={() => setCurrentPage('investment-flow')}
            onBack={() => setCurrentPage('investor-dashboard')}
          />
        )}
        
        {currentPage === 'investment-flow' && (
          <InvestmentFlow 
            poolId={selectedPoolId}
            onComplete={() => setCurrentPage('investor-dashboard')}
            onBack={() => setCurrentPage('pool-detail')}
          />
        )}
        
        {currentPage === 'exporter-withdrawal' && (
          <ExporterWithdrawal 
            onComplete={() => setCurrentPage('exporter-dashboard')}
            onBack={() => setCurrentPage('exporter-dashboard')}
          />
        )}
        
        {currentPage === 'investor-payment-tracking' && (
          <InvestorPaymentTracking 
            onBack={() => setCurrentPage('investor-dashboard')}
          />
        )}
        
        {currentPage === 'add-investment' && (
          <AddInvestment 
            onBack={() => setCurrentPage('investor-dashboard')}
            onComplete={() => setCurrentPage('investor-dashboard')}
          />
        )}
      </div>
  );
}
