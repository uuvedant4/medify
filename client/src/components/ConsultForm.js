import { useState } from "react";

const ConsultForm = () => {
  const props = { probability: 0.9 };
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [healthData, setHealthData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send health data to doctor using the specified information
    console.log("Health data:", healthData);
    console.log("Patient name:", patientName);
    console.log("Doctor name:", doctorName);
    console.log("Doctor email:", doctorEmail);

    // Send health data email if probability is above 50%
    if (props.probability > 0.5) {
      //   sendHealthDataEmail(patientName, doctorName, doctorEmail, healthData);
    }

    setPatientName("");
    setDoctorName("");
    setDoctorEmail("");
    setHealthData("");
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
        />{" "}
      </form>
      <div className="consult-btn">
        <button type="submit">Send</button>
      </div>
    </div>
  );
};

export default ConsultForm;
