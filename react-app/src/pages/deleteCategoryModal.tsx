import React, { useState, MouseEvent } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./styles/DeleteCategoryModal.css"; // Include the CSS file

interface DeleteCategoryModalProps {
  category: string;
  onDeleteCategory: () => void;
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
  setFeedbackColor: React.Dispatch<React.SetStateAction<string>>;
}

function DeleteCategoryModal({
  category,
  setFeedbackMessage,
  setFeedbackColor,
  onDeleteCategory,
}: DeleteCategoryModalProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleConfirmDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Deleting category:", category);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch(
        `http://localhost:3001/api/groceries/deleteCategory`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        }
      );
      const data = await response.json();
      setFeedbackMessage(data.message);
      if (response.ok) {
        setFeedbackColor("green");
        onDeleteCategory();
      } else {
        setFeedbackColor("red");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setFeedbackMessage("Error deleting category");
      setFeedbackColor("red");
    }
    handleClose();
  };

  return (
    <div>
      <IconButton className="deleteCategoryButton" aria-label={`delete ${category}`} onClick={handleOpen}>
        <RemoveCircleIcon />
      </IconButton>
      <Modal onClose={handleClose} open={open}>
        <div className="delete-category-modal-container">
          <p className="delete-category-modal-header">Confirm Deletion</p>
          <p className="delete-category-modal-content">
            Deleting this category will delete all of its items. Confirm?
          </p>
          <div className="delete-category-modal-actions">
            <Button
              className="delete-category-modal-button modal-button-secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="delete-category-modal-button modal-button-primary"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteCategoryModal;
