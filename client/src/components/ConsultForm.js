import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
      if (response.status == 200) {
        toast.success("Message sent!", {
          position: "top-right",
        });
      }
      // Reset form after successful submission
      setPatientName("");
      setDoctorName("");
      setDoctorEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="consult-form">
        <h1>Notify Your Doctor</h1>
        <form>
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
        </form>
        <button onClick={handleSubmit} type="submit">
          Send
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default ConsultForm;
