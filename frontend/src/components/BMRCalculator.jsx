import React, { useState } from "react";

const BMRCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  const calculateBMR = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/bmr/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weight: parseFloat(weight),
        height: parseFloat(height),
        age: parseInt(age),
        gender,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setResult(data.bmr);
    } else {
      setResult("Error");
    }
  };

  return (
    <div>
      <h2>BMR Calculator</h2>
      <form onSubmit={calculateBMR}>
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
        <input
          type="number"
          placeholder="Age (years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Calculate BMR</button>
      </form>
      {result && <p>BMR: {result}</p>}
    </div>
  );
};

export default BMRCalculator;