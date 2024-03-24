import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Balance({ value }) {
  const [data, setData] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    console.log("component mounted");
    axios
      .get("http://localhost:3001/api/v1/account/account-summary", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data.account);
        console.log(response.data.account);
      });
  }, []);
  return (
    <>
      <div className="flex">
        <div className="font-black text-lg">Account Summary</div>
      </div>
      <div className="flex">
        <div className="font-semibold text-lg">First Name:</div>
        <div className="font-mono ml-4 text-lg">
          {localStorage.getItem("firstName")}
        </div>
      </div>
      <div className="flex">
        <div className="font-semibold text-lg">Account Number:</div>
        <div
          className="font-mono ml-4 text-lg"
          onMouseOver={() => setHover(!hover)}
          onMouseOut={() => setHover(!hover)}
        >
          {!hover
            ? data?.userId?.substring(0, data?.userId?.length - 15) +
              "***************"
            : data?.userId}
        </div>
      </div>
      <div className="flex">
        <div className="font-semibold text-lg">Your Balance:</div>
        <div className="font-mono ml-4 text-lg"> Rs: {data.balance} /-</div>
      </div>
    </>
  );
}
