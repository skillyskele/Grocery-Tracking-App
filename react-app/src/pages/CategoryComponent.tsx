import React from "react";
import AddItemModal from "./AddItemModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { CategoryData, Item } from "./types";
import "./styles/CategoryComponent.css";
import { Paper } from "@mui/material";
import ItemComponent from "./ItemComponent";

interface CategoryComponentProps {
  categoryData: CategoryData;
  onDeleteItem: (category: string, item: Item) => void;
  onCategoryAction: () => void;
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
  setFeedbackColor: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  categoryData,
  onDeleteItem,
  onCategoryAction,
  setFeedbackMessage,
  setFeedbackColor,
}) => (
  <div className="category-container">
    <div className="category-header">
      <h2>{categoryData.category}</h2>
      <div className="action-buttons">
        <div className="delete-action">
          <DeleteCategoryModal
            category={categoryData.category}
            setFeedbackMessage={setFeedbackMessage}
            setFeedbackColor={setFeedbackColor}
            onDeleteCategory={onCategoryAction}
          />
        </div>
        <div className="add-action">
          <AddItemModal
            category={categoryData.category}
            setFeedbackMessage={setFeedbackMessage}
            setFeedbackColor={setFeedbackColor}
            onItemAdd={onCategoryAction}
          />
        </div>
      </div>
    </div>
    <div className="paper-container">
      <Paper elevation={2}>
        <ul className="item-list">
          {categoryData.items.map((item, index) => (
            <div className="item-component" key={index}>
              <ItemComponent
                item={item}
                category={categoryData.category}
                onDelete={onDeleteItem}
              />
            </div>
          ))}
        </ul>
      </Paper>
    </div>
  </div>
);

export default CategoryComponent;
