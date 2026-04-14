import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-foreground mb-10 border-b border-border pb-4">Privacy Policy</h1>
      
      <div className="space-y-8 text-foreground/70 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
          <p>
            When you use HomeByte, we may collect personal information such as your name, email address, phone number, and location data when you register an account, save properties, or submit inquiries to our agents.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate, maintain, and provide you with the features of the HomeByte platform. We may also use your information to communicate directly with you, such as sending you updates regarding your saved listings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Data Security</h2>
          <p>
            HomeByte uses commercially reasonable physical, managerial, and technical safeguards to preserve the integrity and security of your personal information. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures.
          </p>
        </section>

        <p className="text-sm mt-10 pt-10 border-t border-border">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
