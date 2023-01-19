import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  /** Automatically fcus on the input */
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTextRef.current?.focus();
  }, []);

  /** Input Message */
  const [inputText, setInputText] = useState<string>("");
  const changeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  /** Submit */
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [friday, setFriday] = useState<ResponseData[]>([]);
  const submitText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText || loading) return;

    const data: SubmitData = {
      msg: inputText,
      conversationId:
        friday.length > 0
          ? friday[friday.length - 1].conversationId
          : undefined,
      messageId:
        friday.length > 0 ? friday[friday.length - 1].messageId : undefined,
    };

    try {
      setError("");
      setLoading(true);

      await axios
        .post("/api/friday", data)
        .then((res) => {
          const newData = { ...res.data, inputText: inputText };
          setFriday([...friday, newData]);
          console.log("🫠", res.data);
          setInputText("");
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

      <main className={`w-full pt-10`}>
        {friday.length > 0 ? (
          <div className={`flex flex-col gap-10`}>
            {friday.map((obj) => (
              <div key={obj.messageId} className={`flex flex-col gap-3`}>
                <p className={`text-base font-semibold`}>{obj.inputText}</p>
                <p className={`text-lg font-bold`}>{obj.response}</p>
              </div>
            ))}
          </div>
        ) : (
          <h1 className={``}>Hello, Friday</h1>
        )}
        {error && <div className={`text-red-400`}>{error}</div>}

        <form
          onSubmit={submitText}
          className={`
            fixed left-1/2 bottom-32 -translate-x-1/2 w-5/6 max-w-2xl 
            flex flex-col items-center gap-5
            lg:w-3/5
          `}
        >
          <input
            ref={inputTextRef}
            className={`w-full py-1 px-3 outline outline-gray-50 rounded-sm bg-transparent text-gray-50`}
            type="text"
            placeholder="Hello, F.R.Y.D.A.Y"
            value={inputText}
            onChange={changeInputText}
          />
        </form>
      </main>
    </div>
  );
}
