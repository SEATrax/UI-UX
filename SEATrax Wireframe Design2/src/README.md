# SEATrax - Web3 Trade Finance Platform

## Overview
SEATrax is a comprehensive Web3 Trade Finance platform that connects ASEAN exporters with investors through invoice tokenization. This wireframe demonstrates the complete user journey for both exporters and investors.

## Key Features

### For Exporters
- **Simple Onboarding**: 3-step registration process with KYC verification
- **Invoice Tokenization**: Easy-to-use form for submitting export invoices
- **Instant Funding**: Receive up to 80% of invoice value within hours
- **Dashboard**: Track active invoices, funding status, and available balance
- **Withdrawal System**: Multiple withdrawal methods with real-time fee calculation

### For Investors
- **Investment Dashboard**: Portfolio overview with performance metrics
- **Pool Selection**: Browse and invest in diversified invoice pools
- **Transparent Data**: Detailed pool information, sector composition, and risk ratings
- **Payment Tracking**: Real-time tracking of returns and cash flow
- **Multiple Payment Methods**: Crypto wallet, bank transfer, or credit card

## Design Principles Implemented

1. **Fiat-First Approach**: All values displayed in familiar currencies (USD, local currency)
2. **Progressive Disclosure**: Complex blockchain operations hidden from non-technical users
3. **Mobile Responsive**: Fully functional on smartphones (375px) and desktop (1440px+)
4. **Clear Status Indicators**: Color-coded statuses for invoices, pools, and payments
5. **Real-Time Calculations**: Instant fee and return calculations throughout the app

## User Flows

### Exporter Flow
1. Landing Page → Role Selection → Exporter Onboarding (3 steps)
2. Dashboard → Create Invoice (4 steps) → Funding
3. Dashboard → Withdraw Funds → OTP Verification

### Investor Flow
1. Landing Page → Role Selection → Investor Onboarding (2 steps)
2. Dashboard → Explore Pools → Pool Detail (4 tabs)
3. Pool Detail → Investment Flow (3 steps) → Confirmation
4. Dashboard → Payment Tracking → Cash Flow Analysis

## Pool Simulation Example

**Pool A - Mixed Commodities**
- Total Target: $250,000
- Amount Raised: $175,000 (70%)
- Invoices: 3 from different exporters
- Investor Distribution:
  - Jono: 70% ($122,500)
  - Ucup: 20% ($35,000)
  - Yudi: 10% ($17,500)

**Return Calculation (4% APR, 30 days)**
- Investment: $10,000
- Interest: $33.33
- Platform Fee: $0.33 (1% of interest)
- Net Return: $10,033.00

## Technical Components

### Main Pages (11 components)
1. **LandingPage** - Public homepage with hero, stats, and testimonials
2. **RoleSelection** - Choose between Exporter or Investor
3. **ExporterOnboarding** - 3-step registration with document upload
4. **InvestorOnboarding** - 2-step registration with wallet connection
5. **ExporterDashboard** - Overview of invoices and funding status
6. **InvoiceTokenization** - 4-step invoice submission flow
7. **InvestorDashboard** - Portfolio overview and available pools
8. **PoolDetail** - Detailed pool information with 4 tabs
9. **InvestmentFlow** - 3-step investment process
10. **ExporterWithdrawal** - Withdrawal form with OTP verification
11. **InvestorPaymentTracking** - Payment history and cash flow

### Key Interactions
- Drag-and-drop document upload with preview
- Real-time form validation with helpful error messages
- Progressive loading states for blockchain transactions
- Responsive data tables (desktop) to cards (mobile)
- Interactive charts using Recharts library
- Multi-currency support with currency selector

## Data Visualization

### Charts Included
1. **Performance Chart** (Investor Dashboard) - Line chart showing ROI over time
2. **Pie Chart** (Pool Detail) - Sector composition breakdown
3. **Cash Flow Timeline** (Pool Detail) - Expected inflows and outflows
4. **Area Chart** (Payment Tracking) - Investment vs. returns over time

### Status Indicators
- **Green**: Funded, Active, Paid, Completed
- **Yellow**: Pending Review, Processing, Pending Payment
- **Blue**: Under Review, Information
- **Red**: Issues, Delays, Failed

## Accessibility Features
- Clear visual hierarchy with proper heading structure
- Color-coded statuses with icons (not color-only)
- Tooltips for complex financial terms
- Mobile-first responsive design
- Large touch targets for mobile interactions

## Security Features
- OTP verification for withdrawals
- KYC verification for both user types
- Document verification with watermarks
- Confirmation checkboxes for important actions
- Risk disclosure statements

## Mobile Optimizations
- Collapsible sidebar navigation
- Bottom navigation bar for key actions
- Swipeable cards for mobile tables
- Optimized form inputs for touch
- Responsive images and charts

## Next Steps for Implementation
1. Connect to Supabase for data persistence
2. Integrate Web3 wallet connection (MetaMask, Trust Wallet)
3. Implement smart contracts for escrow and tokenization
4. Add real-time notifications system
5. Integrate KYC verification service
6. Connect to payment gateways (fiat on-ramp)
7. Add PDF generation for documents and reports

## Color Palette
- **Primary (Blue)**: #2563eb - Exporter actions, primary CTAs
- **Success (Green)**: #10b981 - Investor actions, positive states
- **Warning (Yellow)**: #f59e0b - Pending states, important notices
- **Danger (Red)**: #ef4444 - Errors, critical alerts
- **Gray Scale**: #f9fafb to #111827 - UI elements and text

## Typography
The application uses system fonts with the default typography settings from `/styles/globals.css` for optimal readability across devices.

---

**Developed by**: Hadyan, Valerie, Agung, Humam
**Platform**: SEATrax - On-Chain Financing for Exporters
**Year**: 2025
