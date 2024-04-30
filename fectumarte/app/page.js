import React from "react";
import ContactUs from "./components/ContactUs";
function page() {
  return (
    <div>
      {" "}
      <section
        className="hero bg-cover bg-center h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1581182800629-7d90925ad072?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        {" "}
        <h2 href="/" className="text-white ">
          Fectumarte
        </h2>
        <h1 className="text-white text-4xl font-bold mb-4 m-2 text-center inline-block ml-5">
          Sell your chosen korean skin care product anywhere!
        </h1>
        <a href="#contact-us" className="btn btn-primary">
          <h2 className="text-white">Contact us</h2>
        </a>
      </section>
      <section className="h-80%" id="contact-us">
        <ContactUs />
      </section>
    </div>
  );
}

export default page;
