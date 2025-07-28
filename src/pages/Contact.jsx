import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  // Manage form data with useState (just like in the first form)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

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

    // Send email via EmailJS
    emailjs
      .sendForm(
        "service_csmyfus", // Your service ID
        "template_lkedkvh", // Your template ID
        e.target, // The form element
        "kL-tg3hXqPak5QVS_" // Your user ID
      )
      .then(
        (result) => {
          setStatus("Thank you for reaching out!"); // Success message
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          setStatus("Something went wrong. Please try again."); // Error message
        }
      );
  };

  return (
    <section className="contact-section p-8 bg-gray-800 text-white">
      <h2 className="text-center text-4xl font-bold text-teal-500 mb-8">
        Contact Me
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-xl mx-auto"
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
          className="p-4 bg-teal-500 text-white rounded-md hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Status Message */}
      {status && <p className="mt-6 text-center text-teal-500">{status}</p>}
    </section>
  );
};

export default Contact;
