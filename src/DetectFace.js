import Webcam from "react-webcam";
import { useEffect, useState } from "react";
import "./DetectFace.css";
const width = 500;
const height = 500;

const DetectFace = ({
  isLoading,
  detected,
  facesDetected,
  webcamRef,
  boundingBox,
}) => {
  const [hasPermission, setHasPermission] = useState(true);

  const checkCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (error) {
      setHasPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <div className="main-container">
      {!hasPermission ? (
        <div style={{ color: "indigo" }}> Please Allow Camera Permissions</div>
      ) :  (
        <>
          <h2>Nadeem Fayaz: Face Detection {isLoading}</h2>
          <div style={{ width, height, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                zIndex: "2",
                padding: "10px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  width: "95%",
                  marginTop: "25px",
                }}
              >
                {!detected ? (
                  <p style={{ color: "red", textShadow: "black" }}>
                    No Face Detected
                  </p>
                ) : (
                  <p style={{ color: "green" }}>Face Detected</p>
                )}
                <p>{`👤: ${facesDetected}`}</p>
              </div>
            </div>
            {boundingBox.map((box, index) => (
              <div
                key={`${index + 1}`}
                style={{
                  border: "4px solid red",
                  position: "absolute",
                  top: `${box.yCenter * 100}%`,
                  left: `${box.xCenter * 100}%`,
                  width: `${box.width * 100}%`,
                  height: `${box.height * 100}%`,
                  zIndex: 1,
                }}
              />
            ))}
            <Webcam
              ref={webcamRef}
              forceScreenshotSourceSize
              style={{
                height,
                width,
                position: "absolute",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DetectFace;
