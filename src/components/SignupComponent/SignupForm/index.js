import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [fileURL,setFileURL] = useState("");

  const dispatch = useDispatch();

  const handleSignup = async () => {
    console.log("Handling Signup");
    setLoading(true);
    if (password === confirmPassword && password.length >= 6) {
      try {
        // creating users account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);

        // saving users details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          // profilePic:fileURL,
        });
        // Save data in the redux, call the redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );

        toast.success("User has been created!");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e);
        setLoading(false);
      }
    } else {
      // throw an error
      if (password != confirmPassword) {
        toast.error(
          "Please Make Sure your password and confirm Password matches."
        );
      } else if (password.length < 6) {
        toast.error("Please Choose password having more than 5 digits");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
      />

      <Button
        text={loading ? "Loading . ." : "Signup"}
        disable={loading}
        onClick={handleSignup}
      ></Button>
    </>
  );
}

export default SignupForm;
