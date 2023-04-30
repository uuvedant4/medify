import { useState } from "react";
import axios from "axios";

const ConsultForm = ({ formData }) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      patientName,
      doctorName,
      doctorEmail,
      formData,
    };

    const url = "http://localhost:8009/send-email";

    try {
      const response = await axios.post(url, data);
      console.log(data);
      console.log(response.data);
      // Reset form after successful submission
      setPatientName("");
      setDoctorName("");
      setDoctorEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="consult-form">
      <h1>Notify Your Doctor</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Patient Name"
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
          required
        />
        <input
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(event) => setDoctorName(event.target.value)}
          required
        />
        <input
          placeholder="Doctor's Email"
          value={doctorEmail}
          onChange={(event) => setDoctorEmail(event.target.value)}
          required
        />
        <div className="consult-btn">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ConsultForm;
