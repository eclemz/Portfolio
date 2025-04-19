// import React from 'react'
// import NavigationCircles from "./NavigationCircles";

// const Contact = () => {
    
//   return (
//     <div id='contact' className='h-screen flex flex-col justify-center items-center'>
//         <h2 className='text-4xl font-light md:mb-32 mb-24'>Connect with me</h2>
//         <form className='flex flex-col lg:space-y-12 space-y-8'>
//             <input type="email" placeholder='Email' className='md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border border-red-500 dark:border-yellow-500 placeholder-gray-600 dark:placeholder-yellow-500/50 transition-colors duration 500' />
//             <textarea placeholder='Message' className='md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border border-red-500 dark:border-yellow-500 min-h-[100px] max-h-[200px] placeholder-gray-600 dark:placeholder-yellow-500/50 resize-y p3 transition-colors duration 500' />

//             <input type="submit" value={"stay connected"} className='md:w-[500px] w-[330px] h-13 pl-3 bg-red-500 dark:bg-yellow-500  outline-0 text-lg  uppercase font-extrabold text-white dark:text-gray-600 cursor-pointer tracking-wide shadow-gray-700/20 transition duration-300'/>
//         </form>
//         <NavigationCircles section='contact'/>
//     </div>
//   )
// }


// export default Contact





import React, { useState } from "react";
import NavigationCircles from "./NavigationCircles";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Validate Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:5001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

        if (response.ok) {
          setSuccessMessage("Your message has been sent successfully!");
          setFormData({ email: "", message: "" }); // Clear the form
          setErrors({});
        } else {
          setSuccessMessage("Failed to send your message. Please try again.");
        }
      } catch (error) {
        setSuccessMessage("An error occurred. Please try again.");
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div id="contact" className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-light md:mb-32 mb-24">Connect with me</h2>
      <form onSubmit={handleSubmit} className="flex flex-col lg:space-y-12 space-y-8">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border ${
              errors.email ? "border-red-500" : "border-gray-300 dark:border-yellow-500"
            } placeholder-gray-600 dark:placeholder-yellow-500/50 transition-colors duration-500`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className={`md:w-[500px] w-[330px] h-13 pl-3 text-lg outline-0 border ${
              errors.message ? "border-red-500" : "border-gray-300 dark:border-yellow-500"
            } placeholder-gray-600 dark:placeholder-yellow-500/50 min-h-[100px] max-h-[200px] resize-y p-3 transition-colors duration-500`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
        </div>

        <input
          type="submit"
          value="stay connected"
          className="md:w-[500px] w-[330px] h-13 pl-3 bg-red-500 dark:bg-yellow-500 outline-0 text-lg uppercase font-extrabold text-white dark:text-gray-600 cursor-pointer tracking-wide shadow-gray-700/20 transition duration-300"
        />
      </form>

      {successMessage && <p className="mt-8 text-green-500 text-lg">{successMessage}</p>}

      <NavigationCircles section="contact" />
    </div>
  );
};

export default Contact;