const express = require("express");
const path = require("path");
const app = express();

const accountSid = "ACe09a0aec812ea344955280e20a5ea343";
const authToken = "75b78e01d3942420b4a7712c81c6dbea";
const verifySid = "VA716ca0050089a961f658463dacc18029";
const client = require("twilio")(accountSid, authToken);

app.use(express.static(path.resolve(__dirname, "client")));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

app.post("/send-verification", (req, res) => {
  const phoneNumber = req.body.phone;
  client.verify
    .services(verifySid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => {
      res.json({ success: true, sid: verification.sid });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
});

app.post("/confirm-otp-code", (req, res) => {
  const otpCode = req.body.code;
  const phoneNumber = req.body.phone;

  client.verify
    .services(verifySid)
    .verificationChecks.create({ to: phoneNumber, code: otpCode })
    .then((verification_status) => {
      // Send the verification status back to the client
      res.json({ valid: verification_status.valid });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
