import React, { useState } from "react";
import Step from "./Step";
import { ToastContainer, toast } from "react-toastify";

import defaultAxios from "./axiosInstance";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parseButton, setParseButton] = useState(false);
  const [stepValue, setStepValue] = useState(0);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [backToStepOne, setBackToStepOne] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      setError(null);
    } else {
      setFile(null);
      setMessage("");
      setError("Please select a valid docx file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await defaultAxios.post(
          `${apiUrl}/api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseData = response.data;

        if (response.status === 200) {
          setError("");
          setMessage(responseData.message);
          setParseButton(true);
          setDownloadLink(responseData.downloadLink);
          setStepValue(1);
        } else if (response.status === 401) {
          setLoading(false);
          toast.error(responseData.message, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          setError(responseData.message);
        }
        setFile(null);
        setLoading(false);
      } else {
        setMessage("");
        setLoading(false);
        setError("Please select a file to upload.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setLoading(false);

      if (error.response.status === 401 || error.response.status === 500) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
      } else {
        setError(error.response?.data?.message);
      }
    }
  };

  const convertHandler = async () => {
    setLoading(true);
    setMessage("");

    try {
      const preRes = await axios.post(`${apiUrl}/api/checkPreflight`);
      if (preRes.status === 200) {
        try {
          const response = await defaultAxios.get(
            `${apiUrl}/api/convertDocxToDita`
          );
          const responseData = response.data;
          if (response.status === 200) {
            setLoading(false);
            setError("");
            setParseButton(false);
            setMessage(responseData.message);
            setDownloadLink(responseData.downloadLink);
            setStepValue(2);
          } else if (response.status === 401) {
            setLoading(false);
            toast.error(responseData.message, {
              position: "top-right",
              autoClose: 2000,
            });
          } else {
            setLoading(false);
            setError(responseData.message);
          }
        } catch (error) {
          setLoading(false);
          console.log("catch error", error);
          if (error.response.status === 401 || error.response.status === 500) {
            toast.error(
              error.response?.data?.message ||
                error.message ||
                "Something went wrong. Please try again.",
              {
                position: "top-right",
                autoClose: 2000,
              }
            );
          } else {
            setError(error.response?.data?.message);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
      setParseButton(false);
      setBackToStepOne(true);
      setInvalidFiles(error.response?.data?.invalidFiles);
    }
  };

  function downloadButtonHandler(downloadLink) {
    const a = document.createElement("a");
    a.href = downloadLink;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadLink(null);
    setMessage("");
    setParseButton(false);
    setStepValue(0);
  }

  const stepBackHandler = () => {
    setStepValue(0);
    setParseButton(false);
    setBackToStepOne(false);
    setInvalidFiles([]);
    setError("");
  };
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Step stepValue={stepValue} />
          </div>
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="mt-4 mt-md-0">
              {stepValue === 0 && (
                <div
                  className="input-group mb-3 mx-auto"
                  style={{
                    maxWidth: "500px",
                  }}
                >
                  <input
                    className="form-control w-25 mx-auto"
                    type="file"
                    id="formFile"
                    onChange={handleFileChange}
                    accept=".docx"
                  />

                  <button
                    className="btn btn-outline-secondary text-white border-0"
                    type="submit"
                    id="button-addon2"
                    style={{
                      background: "#71A5CB",
                    }}
                  >
                    Upload
                  </button>
                </div>
              )}
              {error && <div className="text-danger">{error}</div>}
              {invalidFiles && (
                <div className="text-dark mt-3">
                  {invalidFiles.map((file, index) => {
                    return (
                      <span key={index} style={{ display: "block" }}>
                        {file}
                      </span>
                    );
                  })}
                </div>
              )}

              {backToStepOne && (
                <button
                  className="btn btn-info d-block mx-auto mt-3 text-white border-0"
                  style={{
                    background: "#71A5CB",
                  }}
                  type="button"
                  id="button-addon2"
                  onClick={stepBackHandler}
                >
                  Back to step 1
                </button>
              )}

              {message && (
                <div className="text-center">
                  <span className="my-2">{message}</span>
                </div>
              )}

              {parseButton && (
                <button
                  className="btn btn-info d-block mx-auto mt-3 text-white border-0"
                  style={{
                    background: "#71A5CB",
                  }}
                  type="button"
                  id="button-addon2"
                  onClick={convertHandler}
                >
                  Convert to dita format.
                </button>
              )}
              {downloadLink && (
                <button
                  className="text-decoration-none btn mt-4 text-white"
                  style={{
                    background: "#71A5CB",
                  }}
                  onClick={() => downloadButtonHandler(downloadLink)}
                >
                  Download output
                </button>
              )}

              {loading && (
                <div className="spinner-border text-primary mt-4" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Upload;
