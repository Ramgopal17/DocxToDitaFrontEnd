import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import defaultAxios from "./axiosInstance";
const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await callAPI({ email, password });
      if (response.status === 200) {
        navigate("/");

        setTimeout(() => {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
          });
        }, 500);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const callAPI = async (cred) => {
    const url = `${apiUrl}/api/login`;

    try {
      const response = await defaultAxios.post(url, cred, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="container loginPage d-flex align-items-center flex-column pt-5">
      <span
        className="mb-3"
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Login
      </span>
      <form
        onSubmit={handleSubmit}
        className="needs-validation  p-4 rounded-1"
        style={{
          border: "1px solid #00000021",
          width: "min(100%, 500px)",
        }}
      >
        <div className="text-start mb-3">
          <label htmlFor="validationCustom01" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="validationCustom01"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="valid-feedback ">Looks good!</div>
        </div>
        <div className=" text-start">
          <label htmlFor="validationCustom02" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationCustom02"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className=" mt-4">
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
