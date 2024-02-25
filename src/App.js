import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DetectFace from "./DetectFace";
import Home from "./Home";
import { useEffect } from "react";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
const width = 500;
const height = 500;

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState(3);

  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (detected) {
      if (facesDetected == 1) {
          alert('Proceed to Home Page');
          setIsVerified(true);
      } else {
        alert("More than one faces detected");
        setIsVerified(false);
      }
    } else {
      if (!isLoading) {
        alert("No faces detected! Please ensure your face is visible.");
      }
      setIsVerified(false);
    }
  }, [detected, facesDetected]);

  useEffect(() => {
    if (boundingBox.length > 0) {
      if (
        0.12 < boundingBox[0].xCenter &&
        boundingBox[0].xCenter < 0.4 &&
        0.12 < boundingBox[0].yCenter &&
        boundingBox[0].yCenter < 0.5
      ) {
        setStatus("Sitting Correctly");
      } else {
        setStatus("Please align yourself to the center of camera");
      }
    }
  }, [boundingBox]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isVerified ? (
              <Home status={status} />
            ) : (
              <DetectFace
                isLoading={isLoading}
                detected={detected}
                facesDetected={facesDetected}
                webcamRef={webcamRef}
                boundingBox={boundingBox}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
