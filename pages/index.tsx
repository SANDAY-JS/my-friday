import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  /** Input Message */
  const [msg, setMsg] = useState<string>("");
  const changeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
  };

  /** Submit */
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [friday, setFriday] = useState<string>("");
  const submitText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg || loading) return;

    const data: SubmitData = {
      email: process.env.NEXT_CHATGPT_AUTH_EMAIL,
      password: process.env.NEXT_CHATGPT_AUTH_PASSWORD,
      msg: msg,
    };

    try {
      setError("");
      setLoading(true);
      await axios
        .post("/api/friday", data)
        .then((res) => {
          setFriday(res.data);
          console.log("🚀 ~ file: index.tsx:36 ~ .then ~ res.data", res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError("try again");
        });
    } catch (error) {
      console.error(error);
      setError("try again");
      setLoading(false);
    }
  };

  return (
    <div className={`relative w-full px-10 py-5`}>
      <Head>
        <title>Hello, F.R.I.D.A.Y.</title>
        <meta name="description" content="Your Personal Ai Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`w-full `}>
        <h1 className={``}>Hello, Friday</h1>

        {friday && <div className={``}>{friday}</div>}
        {error && <div className={``}>{error}</div>}

        <form
          onSubmit={submitText}
          className={`
            w-full max-w-2xl flex flex-col items-center gap-5
            lg:mx-auto lg:w-3/5
          `}
        >
          <input
            className={`py-1 px-3 border-none bg-transparent`}
            type="text"
            placeholder="Hello, F.R.Y.D.A.Y"
            value={msg}
            onChange={changeInputText}
          />
        </form>
      </main>
    </div>
  );
}
