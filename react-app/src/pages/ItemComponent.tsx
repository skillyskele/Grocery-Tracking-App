import { FC } from "react";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import "./styles/ItemComponent.css";
import { Item } from "./types";
import { IconButton } from "@mui/material";
import Clear from "@mui/icons-material/RemoveCircle";

interface ItemComponentProps {
  item: Item;
  category: string;
  onDelete: (category: string, item: Item) => void;
}

const ItemComponent: FC<ItemComponentProps> = ({
  item,
  category,
  onDelete,
}) => (
  <li className="item">
    <div className="item-details">
      <div className="item-header">
        <div className="item-name">{item.name}</div>
        <span
          className="delete-item-x"
          onClick={() => onDelete(category, item)}
        >
          x
        </span>
      </div>
      <div className="item-info">
        <div className="item-expiration">
          Expiration Date: {format(item.expiration, "MMMM d, yyyy")}
        </div>
        <div className="item-amount">Amount: {item.amount}</div>
      </div>
    </div>
  </li>
);

export default ItemComponent;
