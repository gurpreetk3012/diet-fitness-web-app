import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/bmi/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weight: parseFloat(weight),
        height: parseFloat(height),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setResult(data.bmi);
      setStatus(data.status);
    } else {
      setResult("Error");
      setStatus("");
    }
  };

  return (
    <div>
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI}>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <button type="submit">Calculate BMI</button>
      </form>
      {result && (
        <p>
          BMI: {result} {status && `(${status})`}
        </p>
      )}
    </div>
  );
};

export default BMICalculator;