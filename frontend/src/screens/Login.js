import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("/api/loginuser", {
      //ye phla is the end point jo hit hoga and since ye post request h toh body bhi rahega
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url('https://www.posist.com/restaurant-times/wp-content/uploads/2016/07/restaurant-1090136_1920-1-1024x683.jpg')`, // Replace 'path/to/your/image.jpg')`, // Replace 'path/to/your/image.jpg' with the actual path to your image
        backgroundSize: "cover",
      }}
    >
      <div
        className="container"
        style={{
          width: "30%", // Set the width to 30% of the parent container
          padding: "20px", // Add some padding for spacing
          border: "1px solid #ccc", // Add a border for the box effect
          borderRadius: "5px", // Add rounded corners
          backgroundColor: "#342A21", // Add a white background color to the main content box
        }}
      >
      <div style={{backgroundColor:"#895737", padding:"10px",marginBottom:"15px",textAlign:"center",color:"#342A21",fontSize:"25px"}}>Login</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  );
}
