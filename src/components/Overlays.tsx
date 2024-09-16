import { createPortal } from "react-dom";
import { useEffect } from "react";
import "../App.css"; // Optional for styling

const mountElement = document.getElementById("overlays");

const Overlays = () => {
  if (!mountElement) {
    throw new Error("Unable to find element with id 'overlays'");
  }

 
  useEffect(() => {
    const timer = setTimeout(() => {
      mountElement.innerHTML = ''; 
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  return createPortal(
    <div className="overlay-container">
      <div className="card">
        <h1 className="card-title">Welcome to Pokémon World</h1>
        <p className="card-text">Catch 'em all! Explore and enjoy your adventure.</p>
      </div>
    </div>,
    mountElement
  );
};

export default Overlays;
