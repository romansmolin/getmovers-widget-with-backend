// Function to send phone number for verification
async function sendVerificationCode(phoneNumber) {
  try {
    const response = await fetch("/send-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phoneNumber }),
    });
    const data = await response.json();
    console.log("Verification sent:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to confirm OTP code
async function confirmOTP(phoneNumber, otp) {
  try {
    const response = await fetch("/confirm-otp-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phoneNumber, code: otp }),
    });
    const data = await response.json();

    if (data.valid) {
      console.log("Verification code is approved");
      return true;
    } else {
      console.error("Invalid OTP code");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
