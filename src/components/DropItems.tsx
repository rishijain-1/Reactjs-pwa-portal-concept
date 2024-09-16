import { useState } from "react";
import { createPortal } from "react-dom";
import "../App.css";

interface DropitemsProps {
  onBack: () => void;
}

const Dropitems = ({ onBack }: DropitemsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string>("");

  const mountElement = document.getElementById("dropitems");

  if (!mountElement) {
    throw new Error("Unable to find element with id 'dropitems'");
  }

  const handleSelect = (element: string) => {
    setSelectedElement(element);
    setShowModal(false); // Close the modal after selection
  };

  const renderElement = () => {
    switch (selectedElement) {
      case "heading":
        return <h1>Welcome to Pokémon World</h1>;
      case "paragraph":
        return <p>Explore the world of Pokémon with this amazing app.</p>;
      case "button":
        return <button>Catch a Pokémon</button>;
      case "image":
        return (
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
          />
        );
      default:
        return <p>Select an element from the menu!</p>;
    }
  };

  return createPortal(
    <div className="overlay-content">
      <div className="overlay-header">
        <h2>Choose an HTML Element</h2>
        <button onClick={() => setShowModal(!showModal)}>
          {showModal ? "Close Modal" : "Select Element"}
        </button>
        <button onClick={onBack} className="back-to-pokemon-btn">
          Back to Pokémon List
        </button>
      </div>

      <div className="render-area">{renderElement()}</div>

      {showModal && (
        <div className="modal">
          <button className="close-modal-btn" onClick={() => setShowModal(false)}>
            &times;
          </button>
          <h3>Select an Element to Display:</h3>
          <ul>
            <li onClick={() => handleSelect("heading")}>Heading (H1)</li>
            <li onClick={() => handleSelect("paragraph")}>Paragraph (P)</li>
            <li onClick={() => handleSelect("button")}>Button</li>
            <li onClick={() => handleSelect("image")}>Image</li>
          </ul>
        </div>
      )}
    </div>,
    mountElement
  );
};

export default Dropitems;
