import React, { useState } from "react";
import "./Predictor.css";
import axios from "axios";
import Guage from "./Guage";

const Predictor = () => {
  const [formData, setFormData] = useState({
    chol: "",
    tgl: "",
    hdl_chol: "",
    vldl_chol: "",
    chol_hdl_ratio: "",
    ldl_chol: "",
    age: "",
    sex: "",
  });
  const [prediction, setPrediction] = useState("");
  const url = "http://localhost:8009/predict";

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(url, formData)
      .then((response) => setPrediction(response.data))
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  return (
    <div className="main-container">
      <div className="result-container">
        <div className="result1">
          <Guage />
        </div>
        <div className="result2">{console.log(prediction.prediction)}</div>
      </div>
      <div className="form-container">
        <form className="health-form" onSubmit={handleSubmit}>
          <h1>Enter your health attributes!</h1>
          <div>
            <input
              type="number"
              name="chol"
              value={formData.chol}
              placeholder="Cholesterol"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="tgl"
              value={formData.tgl}
              placeholder="Triglycerides"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="hdl_chol"
              placeholder="HDL Cholesterol"
              value={formData.hdl_chol}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="vldl_chol"
              value={formData.vldl_chol}
              placeholder="VLDL Cholesterol"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="chol_hdl_ratio"
              value={formData.chol_hdl_ratio}
              onChange={handleChange}
              placeholder="Cholesterol/HDL Ratio"
              required
            />
            <input
              type="number"
              name="ldl_chol"
              value={formData.ldl_chol}
              placeholder="LDL Cholesterol"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
          <div className="sex-radio">
            <input
              className="gender-radio"
              type="radio"
              name="sex"
              value={1}
              onChange={handleChange}
            />
            Male
            <input
              className="gender-radio"
              type="radio"
              name="sex"
              value={0}
              onChange={handleChange}
            />
            Female
          </div>
          <button type="submit">Analyze</button>
        </form>
      </div>
    </div>
  );
};

export default Predictor;
