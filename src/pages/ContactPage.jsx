import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    const trimmed = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      setStatus({ loading: false, success: "", error: "Please fill in the required fields." });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || data.message || 'Failed to submit contact request');
      }
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
      setStatus({ loading: false, success: 'Your request has been submitted successfully.', error: '' });
    } catch (error) {
      setStatus({ loading: false, success: '', error: error.message });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="px-5 py-10 sm:px-10 lg:px-20 xl:px-32">
        <section className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FFA920] font-bold">Contact Us</p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-black">Get in Touch With Our Team</h1>
            <p className="mt-4 text-sm sm:text-base text-black leading-7">
              Have a project, question, or custom equipment need? Send us a message and our specialists will help you choose the right industrial storage and safety solution.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-black">Contact Information</h2>
              <p className="mt-4 text-black leading-7">
                Reach out today for a fast reply from our sales and service team. We support orders, custom layouts, installation planning, and secure product sourcing for industrial facilities.
              </p>

              <div className="mt-8 space-y-6 text-black">
                <div>
                  <h3 className="font-semibold text-black">Phone</h3>
                  <p>800-922-6120</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Email</h3>
                  <p>sales@cechms.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Address</h3>
                  <p>Industrial Solutions Division, 1234 Warehouse Drive, City, State</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col text-sm text-black font-medium">
                    Full Name
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 rounded-3xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-[#FFA920] focus:ring-2 focus:ring-[#FFA920]/20"
                      placeholder="John Doe"
                      required
                    />
                  </label>
                  <label className="flex flex-col text-sm text-black font-medium">
                    Company
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-2 rounded-3xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-[#FFA920] focus:ring-2 focus:ring-[#FFA920]/20"
                      placeholder="Acme Logistics"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col text-sm text-black font-medium">
                    Email Address
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 rounded-3xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-[#FFA920] focus:ring-2 focus:ring-[#FFA920]/20"
                      placeholder="name@company.com"
                      required
                    />
                  </label>
                  <label className="flex flex-col text-sm text-black font-medium">
                    Phone Number
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 rounded-3xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-[#FFA920] focus:ring-2 focus:ring-[#FFA920]/20"
                      placeholder="(800) 123-4567"
                    />
                  </label>
                </div>

                <label className="flex flex-col text-sm text-black font-medium">
                  Project Details
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 min-h-[150px] rounded-3xl border border-gray-300 bg-white px-4 py-4 text-black outline-none focus:border-[#FFA920] focus:ring-2 focus:ring-[#FFA920]/20"
                    placeholder="Tell us about your facility, product requirements, and timeline."
                    required
                  />
                </label>

                {status.error && <p className="text-sm text-red-500">{status.error}</p>}
                {status.success && <p className="text-sm text-green-500">{status.success}</p>}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full rounded-full bg-[#FFA920] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#ffb549] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status.loading ? 'Sending request...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
