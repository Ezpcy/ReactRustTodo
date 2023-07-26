import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.message) {
          setStatus(data.message);
        } else {
          console.error("Response data was not as expected:", data);
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []); // This empty array causes this effect to only run once, when the component mounts.

  return (
    <>
      {status === "Everything is working fine" ? (
        <h1>{status}</h1>
      ) : (
        <h1>Error wihthin the API</h1>
      )}
    </>
  );
}

export default App;
