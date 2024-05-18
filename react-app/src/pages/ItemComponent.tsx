import { FC } from "react";
import Button from "@mui/material/Button";
import { Item } from "./types";

interface ItemComponentProps {
  item: Item;
  category: string;
  onDelete: (category: string, item: Item) => void;
}

const ItemComponent: FC<ItemComponentProps> = ({ item, category, onDelete }) => (
  <li className="item">
    <div className="item-details">
      <div className="item-name">{item.name}</div>
      <div className="item-expiration">Expiration Date: {item.expiration}</div>
      <div className="item-amount">Amount: {item.amount}</div>
      <Button variant="outlined" color="error" size="small" onClick={() => onDelete(category, item)}>
        Delete
      </Button>
    </div>
  </li>
);

export default ItemComponent;
