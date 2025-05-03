"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill all fields.");
    }
    // You can replace this with an API call to send the message
    console.log("Message sent:", formData);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-base-300 p-10 text-base-content space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-base-content/70 text-lg">
          Have a question or feedback? We’d love to hear from you.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="font-bold text-lg">Email</h3>
          <p className="text-base-content/70">support@yourapp.com</p>
        </div>
        <div>
          <h3 className="font-bold text-lg">Phone</h3>
          <p className="text-base-content/70">+91 9876543210</p>
        </div>
        <div>
          <h3 className="font-bold text-lg">Location</h3>
          <p className="text-base-content/70">New Delhi, India</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="bg-base-200 rounded-lg p-6 shadow-md space-y-5"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            rows={4}
            placeholder="Your message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        <button className="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
