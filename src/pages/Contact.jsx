
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );

    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleString()
    };

    localStorage.setItem(
      "contactMessages",
      JSON.stringify([...existingMessages, newMessage])
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    setSuccess(true);
  };

  return (
    <>
      {/* Contact Hero */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(120deg, #f8f9fa, #eaf1f8)"
        }}
      >
        <div className="container py-4">
          <p className="text-danger fw-bold">
            WE ARE HERE TO HELP
          </p>

          <h1 className="fw-bold display-4">
            Contact <span className="text-danger">RideNow</span>
          </h1>

          <p className="text-secondary fs-5 mt-3">
            Have a question or need assistance?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container py-5">
        <div className="row g-4 text-center">

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded-3 p-4 h-100">
              <h1 className="text-danger">☎</h1>
              <h5 className="fw-bold">Phone Support</h5>
              <p className="text-muted mb-0">
                Contact us through the message form.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded-3 p-4 h-100">
              <h1 className="text-danger">✉</h1>
              <h5 className="fw-bold">Email Support</h5>
              <p className="text-muted mb-0">
                Send us your questions using the contact form.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm rounded-3 p-4 h-100">
              <h1 className="text-danger">◷</h1>
              <h5 className="fw-bold">Quick Assistance</h5>
              <p className="text-muted mb-0">
                Share your queries and we'll be happy to help.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form */}
      <section className="container pb-5">
        <div className="row justify-content-center">

          <div className="col-lg-8">
            <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">

              <div className="text-center mb-4">
                <p className="text-danger fw-bold">
                  GET IN TOUCH
                </p>

                <h2 className="fw-bold">
                  Send Us a Message
                </h2>

                <p className="text-muted">
                  Fill out the form below with your details.
                </p>
              </div>

              {success && (
                <div className="alert alert-success">
                  Your message has been submitted successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control p-3"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control p-3"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      className="form-control p-3"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Your Message
                    </label>

                    <textarea
                      name="message"
                      className="form-control p-3"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-danger btn-lg px-5"
                    >
                      Send Message
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Contact;
