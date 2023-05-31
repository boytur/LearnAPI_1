/* eslint-disable no-unused-vars */
import React, {useState } from "react";
import axios from "axios";

function Home() {
  const API_KEY = "zx16pTKjVNYbxXW7hAXgHooSOdph4bINtHPtamZw";
  const [dateD, setDateD] = useState("");
  const [dateM, setDateM] = useState("");
  const [dateY, setDateY] = useState("");
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?date=${dateY}-${dateM}-${dateD}&api_key=${API_KEY}`
      );
      setApodData(response.data);
      setError(null);
    } catch (error) {
      setApodData(null);
      setError("ใส่วันเกิดให้ถูกไอ้เปรต");
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    setDateD("");
    setDateM("");
    setDateY("");
    setError(null); // Reset error state when going back
  };

  const handleDownload = () => {
    if (apodData) {
      const link = document.createElement("a");
      link.href = apodData.hdurl || apodData.url;
      link.download = `${apodData.title}.jpg`;
      link.click();
    }
  };

  return (
    <div className="">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Input your birth day</h2>
          <p>Example: 17 3 2004</p>
          <div className="">
            <input
              required
              placeholder="Day"
              type="text"
              id="dateD"
              value={dateD}
              onChange={(e) => setDateD(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              required
              placeholder="Month"
              type="number"
              id="dateM"
              value={dateM}
              onChange={(e) => setDateM(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              required
              placeholder="Year"
              type="text"
              id="dateY"
              value={dateY}
              onChange={(e) => setDateY(e.target.value)}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error}</p>
              <br />
              <button onClick={handleBack}>Back</button>
            </div>
          )}
          {apodData && (
            <div>
              <h1>{apodData.title}</h1>
              <img className="" src={apodData.url} alt={apodData.title} />
              <br />
              <br />
              <button onClick={handleBack}>Back</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
