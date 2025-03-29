
"use client"
import React from 'react';
import Layout from '../pages/layout';
import { Mail, MessageCircle, Send } from 'lucide-react';
const Contact = () => {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-base-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/20 via-base-100 to-base-100 -z-10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] -z-10" />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full mx-auto text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
          </h1>
          <p className="text-lg text-base-content max-w-2xl mx-auto">
          Have questions or just want to say hi? Reach out to me through any of these!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          <div className="card bg-base-200 shadow-xl transition-all duration-300  ">
            <div className="card-body items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="card-title">Email</h2>
              <p className="text-base-content">Send me an email</p>
              <p className="text-base-content/70 mb-4">I usually respond within 24 hours</p>
              <div className="card-actions w-full">
                <button 
                  className="btn btn-outline btn-primary w-full" 
                  onClick={() => window.location.href = "mailto:redouaneidk@gmail.com"}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </button>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl transition-all duration-300  ">
            <div className="card-body items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="card-title">Discord</h2>
              <p className="text-base-content">Chat with me on Discord</p>
              <p className="text-base-content/70 mb-4">I’m usually online!</p>
              <div className="card-actions w-full">
                <button 
                  className="btn btn-outline btn-primary w-full" 
                  onClick={() => window.open("https://discord.com/users/428966319560589312", "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Me

                </button>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl transition-all duration-300   ">
            <div className="card-body items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <h2 className="card-title">Telegram</h2>
              <p className="text-base-content">Message me directly</p>
              <p className="text-base-content/70 mb-4">Quickest way to reach me</p>
              <div className="card-actions w-full">
                <button 
                  className="btn btn-outline btn-primary w-full" 
                  onClick={() => window.open("https://t.me/redouaneidk", "_blank")}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Message Me
                </button>
              </div>
            </div>
          </div>
        </div>
        
      
      </main>
    </div>
      </Layout>
  );
};

export default Contact;