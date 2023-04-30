const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const { spawn } = require("child_process");
const nodemailer = require("nodemailer");

// for user registration

router.post("/register", async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await userdb.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new userdb({
        fname,
        email,
        password,
        cpassword,
      });

      // here password hasing

      const storeData = await finalUser.save();

      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});

// user Login

router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const userValid = await userdb.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" });
      } else {
        // token generate
        const token = await userValid.generateAuthtoken();

        // cookiegenerate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
});

// user valid
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// user logout

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.post("/predict", (req, res) => {
  // Get the input data from the request body
  const { chol, tgl, hdl_chol, vldl_chol, chol_hdl_ratio, ldl_chol, age, sex } =
    req.body;

  // Spawn a Python process to make the prediction
  const pythonProcess = spawn("python", [
    "./predict.py",
    chol,
    tgl,
    hdl_chol,
    vldl_chol,
    chol_hdl_ratio,
    ldl_chol,
    age,
    sex,
  ]);

  // Collect the output from the Python process
  let output = "";
  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  // When the Python process exits, send the output back to the frontend
  pythonProcess.on("close", (code) => {
    res.json({ prediction: output.trim() });
  });
});

router.post("/send-email", async (req, res) => {
  try {
    const { patientName, doctorName, doctorEmail, formData } = req.body;

    // Create a transporter to send the email using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ursvedantyetekar@gmail.com",
        pass: "yhngpreitnjkpzdp",
      },
    });

    // Create the email message
    const message = {
      from: "ursvedantyetekar@gmail.com",
      to: doctorEmail,
      subject: `Health Report for ${patientName}`,
      text: `
        Dear Dr. ${doctorName},

        Here is the health report for ${patientName}:

        Cholesterol: ${formData.chol}
        Triglycerides: ${formData.tgl}
        HDL Cholesterol: ${formData.hdl_chol}
        VLDL Cholesterol: ${formData.vldl_chol}
        Cholesterol/HDL Ratio: ${formData.chol_hdl_ratio}
        LDL Cholesterol: ${formData.ldl_chol}
        Age: ${formData.age}
        Sex: ${formData.sex == 1 ? "Male" : "Female"}
        
                        Thank You!
                        
        Yours Sincerely,
        Medify Health Report Bot.
      `,
    };

    // Send the email
    const info = await transporter.sendMail(message);

    console.log("Email sent: ", info.messageId);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;

// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true
