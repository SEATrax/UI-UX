import { useState } from 'react';
import { ArrowLeft, ArrowRight, Wallet, CreditCard, Building2, Check, AlertCircle } from 'lucide-react';

interface InvestmentFlowProps {
  poolId: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function InvestmentFlow({ poolId, onComplete, onBack }: InvestmentFlowProps) {
  const [step, setStep] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState('10000');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'bank' | 'card'>('crypto');
  const [isProcessing, setIsProcessing] = useState(false);

  const minInvestment = 5000;
  const maxInvestment = 50000;
  const availableBalance = 25000;
  const yieldRate = 4.0;
  const duration = 30; // days

  const calculateReturns = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const interest = (amount * yieldRate * duration) / (100 * 365);
    const platformFee = interest * 0.01;
    return {
      principal: amount,
      interest: interest,
      platformFee: platformFee,
      total: amount + interest - platformFee,
    };
  };

  const returns = calculateReturns();

  const paymentMethods = [
    {
      id: 'crypto',
      name: 'Crypto Wallet',
      description: 'USDC, USDT (Instant)',
      fee: '0%',
      processingTime: 'Instant',
      icon: Wallet,
      color: 'purple',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank deposit',
      fee: '0%',
      processingTime: '3-5 business days',
      icon: Building2,
      color: 'blue',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard',
      fee: '2.5%',
      processingTime: 'Instant',
      icon: CreditCard,
      color: 'orange',
    },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate transaction
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onComplete();
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const isAmountValid = () => {
    const amount = parseFloat(investmentAmount) || 0;
    return amount >= minInvestment && amount <= maxInvestment && amount <= availableBalance;
  };

  const isStepValid = () => {
    if (step === 1) return isAmountValid();
    if (step === 2) return paymentMethod !== null;
    if (step === 3) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl text-gray-900 mb-2">Invest in Pool</h1>
          <p className="text-gray-600">Pool ID: {poolId}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  s < step ? 'bg-green-600 text-white' :
                  s === step ? 'bg-green-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Amount</span>
            <span>Payment</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Step 1: Investment Amount */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Investment Amount</h2>

              <div>
                <label className="block text-gray-700 mb-2">
                  How much would you like to invest?
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-600 text-xl">$</span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full px-12 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10000"
                    min={minInvestment}
                    max={maxInvestment}
                  />
                </div>
                
                <div className="mt-4">
                  <input
                    type="range"
                    min={minInvestment}
                    max={maxInvestment}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${minInvestment.toLocaleString()}</span>
                    <span>${maxInvestment.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Investment:</span>
                    <span className="text-gray-900">${minInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Investment:</span>
                    <span className="text-gray-900">${maxInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Balance:</span>
                    <span className="text-gray-900">${availableBalance.toLocaleString()}</span>
                  </div>
                </div>

                {!isAmountValid() && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      {parseFloat(investmentAmount) < minInvestment && `Minimum investment is $${minInvestment.toLocaleString()}`}
                      {parseFloat(investmentAmount) > maxInvestment && `Maximum investment is $${maxInvestment.toLocaleString()}`}
                      {parseFloat(investmentAmount) > availableBalance && 'Amount exceeds available balance'}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-gray-900 mb-4">Estimated Returns</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Investment Amount:</span>
                    <span className="text-gray-900">${returns.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Interest ({yieldRate}% APR, {duration} days):</span>
                    <span className="text-green-600">+${returns.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t border-green-200 pt-3 flex justify-between">
                    <span className="text-gray-900">Estimated Total Return:</span>
                    <span className="text-xl text-green-600">${returns.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Select Payment Method</h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`w-full p-4 border-2 rounded-lg text-left hover:border-green-500 transition-colors ${
                        paymentMethod === method.id ? 'border-green-500 bg-green-50' : 'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${method.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-900 mb-1">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">{method.fee} fee</div>
                          <div className="text-xs text-gray-600">{method.processingTime}</div>
                        </div>
                        {paymentMethod === method.id && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'crypto' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2">Crypto Payment Details</h4>
                  <p className="text-sm text-blue-800">
                    You'll be prompted to connect your wallet and approve the transaction in the next step.
                  </p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2">Bank Transfer Instructions</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    You'll receive virtual account details after confirmation. Transfer will be verified within 3-5 business days.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="text-orange-900 mb-2">Card Payment</h4>
                  <p className="text-sm text-orange-800">
                    A 2.5% processing fee will be added to your investment amount.
                    Total: ${((parseFloat(investmentAmount) || 0) * 1.025).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-900 mb-1">Fee Comparison</h4>
                    <p className="text-sm text-yellow-800">
                      Crypto wallet and bank transfer have no additional fees. Credit card payments include a 2.5% processing fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Confirm Investment</h2>

              <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-gray-700 mb-3">Investment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pool ID:</span>
                      <span className="text-gray-900">{poolId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Amount:</span>
                      <span className="text-gray-900">${parseFloat(investmentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Return:</span>
                      <span className="text-green-600">${returns.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maturity Date:</span>
                      <span className="text-gray-900">{new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-gray-700 mb-3">Payment Method</h3>
                  <div className="flex items-center gap-3">
                    {paymentMethod === 'crypto' && <Wallet className="w-5 h-5 text-purple-600" />}
                    {paymentMethod === 'bank' && <Building2 className="w-5 h-5 text-blue-600" />}
                    {paymentMethod === 'card' && <CreditCard className="w-5 h-5 text-orange-600" />}
                    <span className="text-gray-900">
                      {paymentMethods.find(m => m.id === paymentMethod)?.name}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Total Investment:</span>
                      <span className="text-2xl text-green-600">
                        ${(paymentMethod === 'card' 
                          ? (parseFloat(investmentAmount) * 1.025) 
                          : parseFloat(investmentAmount)
                        ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="text-xs text-gray-600">Includes 2.5% processing fee</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-gray-700">
                    I understand that investments carry risk and I may lose some or all of my investment
                  </span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the pool terms and conditions
                  </span>
                </label>
              </div>

              {isProcessing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <div>
                      <div className="text-blue-900">Processing your investment...</div>
                      <div className="text-sm text-blue-700">This may take a few moments. Please don't close this window.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid() || isProcessing}
              className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center gap-2 ${
                isStepValid() && !isProcessing
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  {step === 3 ? 'Confirm Investment' : 'Continue'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
