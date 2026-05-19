import Head from "next/head";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (res.ok) {
        alert("Registration Successful");

        // save token
        localStorage.setItem("token", data.token);

        window.location.href = "/login";
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Pixio - Shop & eCommerce Tailwind CSS Template | DexignZone</title>

        <link rel="icon" href="/assets/images/favicon.png" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>

      <div className="page-content bg-light">
        <section className="px-4">
          <div className="row align-center-center">

            {/* LEFT SIDE (UNCHANGED UI) */}
            <div className="col-xxl-6 lg:w-1/2 w-full relative bg-[#FFEDD4] z-1 
      after:content-[''] after:absolute after:bottom-0 after:left-[16%] 
      after:w-[51%] after:h-3/5 after:bg-white after:rounded-t-full 
      after:z-[-2] start-side-content">

              <div className="dz-bnr-inr-entry">
                <h1 style={{ fontWeight: 'bold' }} className="xl:text-[40px] md:text-4xl sm:text-3xl text-2xl mb-2">
                  My Account
                </h1>

                <nav className="mb-4">
                  <ul>
                    <li className="mr-[3px] inline-block text-base font-medium">
                      <a href="/">Home</a>
                    </li>

                    <li className="mr-[3px] pl-2 inline-block text-base font-medium">
                      Shop Registration
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="text-right relative -z-1 m-auto -mt-[90px] max-3xl:mt-0 registration-media">
                <img src="/images/bb-01.png" alt="" />
              </div>
            </div>

            {/* RIGHT SIDE (UNCHANGED UI) */}
            <div className="flex flex-col w-full col-xxl-6 lg:w-1/2 end-side-content">
              <div className="p-20 max-w-[522px] m-auto rounded-[20px] border border-secondary w-full 
        max-xl:p-7 max-sm:!p-4">

                <h2 className="mb-2 text-center md:text-[28px] text-2xl font-bold">
                  Registration Now
                </h2>

                <p className="text-base text-center text-body mb-7">
                  Welcome please registration to your account
                </p>

                <form onSubmit={handleSubmit}>

                  {/* FIRST NAME (changed from username) */}
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">
                      First Name
                    </label>
                    <input
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      type="text"
                    />
                  </div>

                  {/* LAST NAME */}
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      type="text"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      type="email"
                    />
                  </div>

                  {/* PHONE (added safely, UI same) */}
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      type="text"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-10">
                    <label className="block mb-1 font-medium">
                      Password
                    </label>

                    <div className="relative z-1">
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      />
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="mb-10">
                    <label className="block mb-1 font-medium">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="password_confirmation"
                      value={form.password_confirmation}
                      onChange={handleChange}
                      className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                    />
                  </div>

                  {/* BUTTONS (UNCHANGED) */}
                  <div className="text-center">

                    <button
                      type="submit"
                      className="py-3 mr-2 text-base font-medium text-white uppercase border btn px-7 border-secondary bg-secondary rounded-xl">
                      Register
                    </button>

                    <a
                      href="/login"
                      className="py-3 text-base font-medium uppercase border btn px-7 border-secondary hover:bg-secondary hover:text-white rounded-xl">
                      Sign In
                    </a>

                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}