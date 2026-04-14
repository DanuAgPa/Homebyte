import React from "react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">About HomeByte</h1>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
          We are redefining the real estate experience by combining modern technology with premium property curation.
        </p>
      </div>
      
      <div className="glass p-10 rounded-3xl shadow-xl mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
        <p className="text-foreground/70 leading-relaxed mb-8">
          At HomeByte, our mission is to empower buyers, sellers, and agents with a seamless, highly aesthetic platform. We believe that finding your dream home shouldn't just be a transaction; it should be an experience.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/70">
          <li><strong>Premium Listings:</strong> We curate only the best properties in top-tier locations.</li>
          <li><strong>High Performance:</strong> Built with cutting-edge technology to ensure a blazingly fast browsing experience.</li>
          <li><strong>Beautiful Design:</strong> Our interface is designed to focus entirely on the properties, giving them the spotlight they deserve.</li>
        </ul>
      </div>
    </div>
  );
}
