import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label={"First Name"}
            value={firstName}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
            value={lastName}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="harkirat@gmail.com"
            label={"Email"}
            value={username}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
            value={password}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3001/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("firstName", response.data.firstName);
                navigate("/dashboard");
              }}
              label={"Signup"}
            />
          </div>
          <BottomWarning
            label={"Already Have an account?"}
            buttonText={"Signin"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
