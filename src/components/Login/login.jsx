import { useState, useEffect } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebaseconfig";
const Login = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { auth, isLoggedIn, signInUserWithPhoneNumber } = useFirebase();

  //Redirecting user to homepage after entering phoneNumber in firestore
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      // handleUser(user);
    }
  }, [isLoggedIn]);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) =>({
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignUp
        }),
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
    //console.log(window.recaptchaVerifier);
  }
  const onSignUp = async () => {
    setLoading(true);
    await onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
    await signInUserWithPhoneNumber(formatPh, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP SENT");
      })
      .catch((error) => {
        // Error; SMS not sent
        toast.error("INVALID NUMBER");
        // console.log(error);
        setLoading(false);
      });
  };
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // setUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("WRONG VERIFICATION CODE");
        /*Catch */

        //console.log(error);
        setLoading(false);
      });
  }
  //console.log(user);

  return (
    <section className="bg-cyan-600 flex items-center justify-center overflow-hidden h-screen">
      <div className=" bg-cyan-700">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {isLoggedIn ? null : (
          /* <>
 {console.log(user)}
 {navigate("/home")}
 </> */
          <div className=" w-80 flex flex-col gap-4 border border-green-500 shadow-green-600 shadow-md rounded-lg p-4 ">
            <h1 className=" text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to{" "}
              <span className=" font-mono text-4xl p-4">
                MedicalRecord<span className=" align-bottom animate-pulse">!</span>
              </span>
            </h1>
            {showOTP ? (
              //OTP VERIFICATION FIELDS
              <>
                <div className=" bg-white text-green-500 w-fit mx-auto p-4 rounded-full shadow-green-600 shadow-lg">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className=" text-white font-bold text-2xl text-center font-mono"
                >
                  Enter OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength="6"
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                />
                <button
                  onClick={onOTPVerify}
                  className=" shadow-green-600 shadow-sm bg-green-500 text-white font-mono rounded w-full flex items-center justify-center gap-1 py-2.5 "
                >
                  {loading && (
                    <CgSpinner size={20} className=" mt-1 animate-spin " />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              //PHONE NUMBER FIELDS
              <>
                <div className=" bg-white text-green-500 w-fit mx-auto p-4 rounded-full shadow-green-600 shadow-lg">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="ph"
                  className=" text-white font-bold text-2xl text-center font-mono"
                >
                  Verify Phone Number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignUp}
                  className=" shadow-green-600 shadow-sm bg-green-600 text-white font-mono rounded w-full flex items-center justify-center gap-1 py-2.5 "
                >
                  {loading && (
                    <CgSpinner size={20} className=" mt-1 animate-spin " />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
