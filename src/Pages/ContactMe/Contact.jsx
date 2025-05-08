import React from "react";
import FadeInUp from "../../Components/FadeInUp";

const Contact = () => {
  return (
    <section className="container mx-auto px-4 py-12 connect_me_section">
      {/* Title */}
      <FadeInUp index={1}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold contact_title">Contact</h1>
          <h5 className="text-lg text-yellow-400 contact_sub_title">
            Let's Talk About Ideas
          </h5>
        </div>
      </FadeInUp>

      <div className="flex flex-col lg:flex-row gap-10 contact_main_container">
        {/* Left Info Section */}
        <div className="contact_info flex-1 text-center lg:text-left space-y-6">
          <FadeInUp index={2}>
            <img
              src="/images/hanshake.jpg"
              alt="contact me"
              className="mx-auto lg:mx-0 w-60 h-auto rounded-xl shadow-lg"
            />
          </FadeInUp>

          <FadeInUp index={3}>
            <h1 className="text-2xl font-bold info_title">
              Chibgatullah Minhaz
            </h1>
          </FadeInUp>

          <FadeInUp index={4}>
            <h3 className="text-lg font-medium">Web Developer (MERN)</h3>
          </FadeInUp>

          <FadeInUp index={5}>
            <p className="text-gray-300 max-w-md mx-auto lg:mx-0">
              Are you looking for your business online presence? Don’t hesitate
              to contact me. I’m available here 🙂.
            </p>
          </FadeInUp>

          <article className="space-y-4">
            {[
              {
                icon: "fa-location-dot",
                title: "Address",
                value: "Chittagong, Bangladesh",
              },
              {
                icon: "fa-user",
                title: "Freelancer",
                value: "Available Right Now",
              },
              {
                icon: "fa-envelope",
                title: "Email",
                value: "chibgatullahminhaz@gmail.com",
              },
            ].map((item, idx) => (
              <FadeInUp index={6 + idx} key={idx}>
                <address className="flex items-start gap-4 not-italic">
                  <div className="text-yellow-400 text-xl">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="text-left">
                    <h1 className="font-semibold">{item.title}</h1>
                    <p>{item.value}</p>
                  </div>
                </address>
              </FadeInUp>
            ))}
          </article>
        </div>

        {/* Right Contact Form */}
        <div className="contact_input flex-1">
          <FadeInUp index={9}>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          </FadeInUp>

          <form
            id="contactForm"
            className="space-y-4 w-full max-w-lg mx-auto lg:mx-0"
          >
            {[
              {
                label: "Name",
                id: "name",
                type: "text",
                placeholder: "Enter Your Name",
              },
              {
                label: "Email",
                id: "email",
                type: "email",
                placeholder: "Enter Your Email",
              },
            ].map((field, i) => (
              <FadeInUp index={10 + i} key={field.id}>
                <div>
                  <label htmlFor={field.id} className="block mb-1 font-medium">
                    {field.label}:
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-yellow-400 focus:outline-none"
                  />
                </div>
              </FadeInUp>
            ))}

            <FadeInUp index={12}>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">
                  Message:
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-yellow-400 focus:outline-none"
                ></textarea>
              </div>
            </FadeInUp>

            <FadeInUp index={13}>
              <a
                href="mailto:chibgatullahminhaz@email.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition"
              >
                Say Hello
              </a>
            </FadeInUp>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
