
import React from 'react';
import Navbar from "@/components/Navbar";
import MembershipForm from "@/components/MembershipForm";
import Footer from "@/components/Footer";

const MembershipApplication = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow py-12">
        <MembershipForm />
      </main>
      <Footer />
    </div>
  );
};

export default MembershipApplication;
