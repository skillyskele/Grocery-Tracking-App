import React, { FormEvent, useState } from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import "./styles/AddItemModal.css";
import { Macros } from "./types";
import ItemTextField from "./ItemTextField";
import AddCircle from "@mui/icons-material/AddCircle";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface Props {
  category: string;
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
  setFeedbackColor: React.Dispatch<React.SetStateAction<string>>;
  onItemAdd: () => void;
}

function AddItemModal({
  category,
  setFeedbackMessage,
  setFeedbackColor,
  onItemAdd,
}: Props) {
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [itemExpiration, setItemExpiration] = useState<Date | null>(null);
  const [macros, setMacros] = useState<Macros>({
    protein: "",
    carbs: "",
    fat: "",
  });
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<string>("");
  const unitOptions = [
    "g",
    "kg",
    "mL",
    "L",
    "piece",
    "oz",
    "cup",
    "tsp",
    "tbsp",
    "fl oz",
    "pint",
    "quart",
    "gallon",
    "dozen",
    "pack",
    "bunch",
    "bundle",
    "box",
    "bag",
    "jar",
    "bottle",
    "can",
    "container",
    "packet",
    "slice",
  ]; //in the future: automatically add 's' or 'es' when plural

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const pluralizeUnit = (unit: string) => {
    if (
      unit.endsWith("y") &&
      !unit.endsWith("ay") &&
      !unit.endsWith("ey") &&
      !unit.endsWith("oy") &&
      !unit.endsWith("uy")
    ) {
      return unit.slice(0, -1) + "ies";
    } else if (
      unit.endsWith("s") ||
      unit.endsWith("x") ||
      unit.endsWith("z") ||
      unit.endsWith("sh") ||
      unit.endsWith("ch")
    ) {
      return unit + "es";
    } else if (unit.endsWith("e")) {
      return "pieces";
    } else if (
      ["g", "kg", "mL", "L", "oz", "fl oz", "tsp", "tbsp"].includes(unit)
    ) {
      return unit;
    } else {
      return unit + "s";
    }
  };

  const formItemAmountString = (itemAmount: string, unit: string) => {
    if (parseFloat(itemAmount) > 1) {
      unit = pluralizeUnit(unit);
    }

    return itemAmount + " " + unit;
  };

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(
        `http://localhost:3001/api/groceries/addGroceryItem`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            name: itemName,
            amount: formItemAmountString(itemAmount, unit),
            expiration: itemExpiration,
            macros: macros,
          }),
        }
      );
      const data = await response.json();
      setFeedbackMessage(data.message);
      if (response.ok) {
        setFeedbackColor("green");
        console.log("added item");
        onItemAdd();
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

  return (
    <div>
      <IconButton aria-label="Add item" onClick={handleOpen}>
        <AddCircle />
      </IconButton>
      <Modal onClose={handleClose} open={open}>
        <div className="add-item-modal-container">
          <div className="add-item-modal-content">
            <form onSubmit={addItem} className="add-item-modal-form">
              <ItemTextField
                type="text"
                label="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
              <div className="horizontal-inputs">
                <ItemTextField
                  className="input-field"
                  type="text"
                  label="Enter item amount"
                  value={itemAmount}
                  sx={{
                    maxWidth: "143px",
                  }}
                  onChange={(e) => setItemAmount(e.target.value)}
                  required
                />
                <select
                  className="input-field"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="">Select unit</option>
                  {unitOptions.map((unitOption, index) => (
                    <option key={index} value={unitOption}>
                      {unitOption}
                    </option>
                  ))}
                </select>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enter expiration date"
                  value={itemExpiration}
                  onChange={(newValue: Date | null) => setItemExpiration(newValue)}
                />
              </LocalizationProvider>

              <ItemTextField
                type="number"
                label="Enter Protein"
                value={macros.protein}
                onChange={(e) =>
                  setMacros({ ...macros, protein: parseFloat(e.target.value) })
                }
                required
              />
              <ItemTextField
                type="number"
                label="Enter Carbs"
                value={macros.carbs}
                onChange={(e) =>
                  setMacros({ ...macros, carbs: parseFloat(e.target.value) })
                }
                required
              />
              <ItemTextField
                type="number"
                label="Enter Fat"
                value={macros.fat}
                onChange={(e) =>
                  setMacros({ ...macros, fat: parseFloat(e.target.value) })
                }
                required
              />

              <Button
                type="submit"
                className="add-item-modal-button modal-button-primary"
                sx={{
                  fontFamily: "cursive",
                  color: "white",
                  borderColor: "green",
                  backgroundColor: "#50c878",
                  "&:hover": { backgroundColor: "#2E8B57" },
                }}
              >
                Add Item
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddItemModal;
