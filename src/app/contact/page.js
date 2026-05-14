import React from 'react';

export const metadata = {
  title: 'Contact Us | Mohammadi Developers Ltd.',
  description: 'Get in touch with Mohammadi Developers Ltd. for your real estate needs.',
};

export default function Contact() {
  return (
    <div className="bg-background dark:bg-black min-h-screen font-sans selection:bg-brand-green selection:text-white pb-20 transition-colors duration-500">
      
      {/* Header Banner */}
      <section className="bg-zinc-950 pt-32 pb-20 px-4 text-center border-b border-zinc-800 transition-colors duration-500">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          We're here to help. Reach out to us for any inquiries about our projects or services.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-10">
        <div className="bg-brand-light-gray dark:bg-zinc-900 rounded-3xl shadow-2xl border border-brand-soft-gray dark:border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Contact Information (Left Side) */}
            <div className="bg-brand-dark-green p-10 lg:p-16 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                <p className="text-green-50 mb-10 text-lg leading-relaxed font-light">
                  Have questions about our premium residential apartments or want to schedule a visit? Fill out the form, or reach out using the details below.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 border border-white/20">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Head Office</h4>
                      <p className="text-green-50 leading-relaxed font-light">
                        2, Mohammadi Main Road,<br />
                        Mohammadi Housing Ltd.,<br />
                        Mohammadpur, Dhaka-1207
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 border border-white/20">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone & Cell</h4>
                      <p className="text-green-50 font-light">Phone: +88 02 58151053</p>
                      <p className="text-green-50 font-light">Cell: +88 01730 019750</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 border border-white/20">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email & Web</h4>
                      <p className="text-green-50 font-light">shahnawaz@mohammadi-group.com</p>
                      <p className="text-green-50 font-light">www.mohammadi-group.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="mt-16 flex gap-4 opacity-50">
                <div className="w-12 h-12 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Contact Form (Right Side) */}
            <div className="p-10 lg:p-16">
              <h3 className="text-2xl font-bold text-foreground mb-8">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-medium-gray dark:text-brand-white/60 mb-2">Your Name (required)</label>
                    <input type="text" id="name" required className="w-full bg-background dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-medium-gray dark:text-brand-white/60 mb-2">Your Email (required)</label>
                    <input type="email" id="email" required className="w-full bg-background dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-medium-gray dark:text-brand-white/60 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full bg-background dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors" placeholder="How can we help you?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-medium-gray dark:text-brand-white/60 mb-2">Your Message</label>
                  <textarea id="message" rows="5" className="w-full bg-background dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors resize-none" placeholder="Write your message here..."></textarea>
                </div>

                <button type="submit" className="w-full bg-brand-dark-green hover:bg-brand-green text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="w-full h-[500px] bg-brand-light-gray dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl border border-brand-soft-gray dark:border-zinc-800 relative group transition-colors duration-500">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d228.22408602609985!2d90.3582698!3d23.7621606!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf96477ff501%3A0xb142d1e61509b639!2z4Kau4KeL4Ka54Ka-4Kau4KeN4Kau4Kam4KeAIOCmueCmvuCmieCmnOCmv-CmgiDgpo_gprLgpp_gpr_gpqHgpr8g4Kaw4KeH4KaV4Kaw4KeN4KahIOCmheCmq-Cmv-CmuA!5e0!3m2!1sbn!2sbd!4v1778665576084!5m2!1sbn!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
