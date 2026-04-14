import React from "react";

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-foreground mb-10 border-b border-border pb-4">Terms of Service</h1>
      
      <div className="space-y-8 text-foreground/70 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the HomeByte platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of HomeByte and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HomeByte.
          </p>
        </section>
        
        <p className="text-sm mt-10 pt-10 border-t border-border">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
