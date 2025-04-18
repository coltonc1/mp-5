"use client";

import {useState} from "react";
import createAlias from "../lib/CreateAlias.tsx";


export default function Home() {

  const[url, setUrl] = useState("");
  const[alias, setAlias] = useState("");
  const[status, setStatus] = useState("");

  async function shorten() {
    setStatus("");
    const results = await createAlias(alias, url);
    setStatus(results);
  }

  function displayResult() {
    const urlToDisplay = "localhost:3000/" + alias;
    if(status === "") {
      return (
        <>
        </>
      )
    } else if(status === "invalid url") {
      return (
        <h4 className="text-2xl">Invalid URL: Could not verify URL. Please try again.</h4>
      )
    } else if(status === "alias exists") {
      return (
        <h4 className="text-2xl">Invalid alias: This alias already exists</h4>
      )
    } else if(status === "insertion failed") {
      return (
        <h4 className="text-2xl">The database failed to insert your alias</h4>
      )
    } else if(status === "success") {
      return (
        <div>
          <h4 className="text-2xl">Your shortened url:</h4>
          <a href={urlToDisplay}>
            <h4 className="text-2xl">vercel.com/{alias}</h4>
          </a>
        </div>
      )
    } 
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <div className="mt-25 inline-block flex flex-col text-center bg-red-300 p-2">
        <h1 className="text-6xl font-bold">Url Shortener</h1>
        <h4 className="text-2xl">Shorten your long URLs into compact, shareable links</h4>
      </div>
      <div className="mt-5">
        <h3>Url</h3>
        <input
          className="mt-4 mb-4 h-10 w-200 border rounded-sm border-black border-solid" 
          type="text" 
          placeholder="Enter a url" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <h3>Custom Alias</h3>
        <input 
          className="mt-4 mb-4 h-10 w-200 border rounded-sm border-black border-solid" 
          type="text" 
          placeholder="Enter an alias" 
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </div>
      <button className="rounded-md bg-red-300 py-4 px-5 text-center text-lg text-white" onClick={shorten}>Shorten</button>
      {displayResult()}
    </div>
    </>
  );
}
