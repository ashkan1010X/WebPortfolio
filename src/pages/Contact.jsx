import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  // Manage form data with useState
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    emailjs
      .sendForm(
        "service_csmyfus",
        "template_lkedkvh",
        e.target,
        "kL-tg3hXqPak5QVS_"
      )
      .then(
        () => {
          setStatus("Thank you for reaching out! I'll get back soon.");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Something went wrong. Please try again.");
        }
      )
      .finally(() => setSending(false));
  };

  return (
    <section className="contact-section min-h-screen pt-28 pb-16 px-6 bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-center text-4xl font-bold text-teal-400 mb-8">
        Contact
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-xl mx-auto bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl"
      >
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-4 rounded-md bg-gray-700 text-white border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-4 rounded-md bg-gray-700 text-white border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Message Textarea */}
        <textarea
          name="message"
          placeholder="Your Message"
          className="p-4 rounded-md bg-gray-700 text-white border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={sending}
          className="p-4 bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 font-semibold"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Status Message */}
      {status && <p className="mt-6 text-center text-teal-400">{status}</p>}
    </section>
  );
};

export default Contact;
