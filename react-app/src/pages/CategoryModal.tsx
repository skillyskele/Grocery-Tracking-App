import React, { FormEvent, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./styles/CategoryModal.css";

interface Props {
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
  setFeedbackColor: React.Dispatch<React.SetStateAction<string>>;
  onAddCategory: () => void;
}

function CategoryModal({
  setFeedbackMessage,
  setFeedbackColor,
  onAddCategory,
}: Props) {
  const [category, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(category);
    const token = localStorage.getItem("token"); // Retrieve the stored token
    if (!token) return; // If no token, perhaps redirect to login page

    try {
      console.log("adding category...");
      const response = await fetch(
        "http://localhost:3001/api/groceries/addCategory",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, //this will go to authenticateToken.js first, which will pass its results to the rest of the router function
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        }
      );
      const data = await response.json();
      setFeedbackMessage(data.message);
      if (response.ok) {
        setFeedbackColor("green");
        onAddCategory();
      } else {
        setFeedbackColor("red");
      }
    } catch (error) {
      console.error("Client: Error adding item:", error);
      setFeedbackMessage("Error adding item");
      setFeedbackColor("red");
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="add-category-button-container">
        <Button
          variant="contained"
          type="submit"
          onClick={handleOpen}
          sx={{
            fontFamily: "cursive",
            backgroundColor: "rgb(105, 230, 105)",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          Add Category
        </Button>
      </div>
      <Modal onClose={handleClose} open={open}>
        <div className="add-category-modal-container">
          <form onSubmit={handleSubmit} className="add-category-modal-form">
            <input
              type="text"
              placeholder="Enter category name"
              value={category}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="category-modal-button-container">
              <Button
                variant="outlined"
                type="button"
                onClick={handleClose}
                sx={{
                  fontFamily: "cursive",
                  color: "green",
                  borderColor: "green",
                  "&:hover": { backgroundColor: "black" },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  fontFamily: "cursive",
                  color: "white",
                  borderColor: "green",
                  backgroundColor: "rgb(105, 230, 105)",
                  "&:hover": { backgroundColor: "black" },
                }}
              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CategoryModal;
