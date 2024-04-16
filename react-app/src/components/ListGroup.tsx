import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  //pass in props of type props...or items then heading..you're like passing in this json..but it's an interface, that expects items and a heading

  const [selectedIndex, setSelectedIndex] = useState(-1); //very useful, check it out

  return (
    <>
      <h1>{heading}</h1> //here's where we ended up using heading
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map(
          (
            item,
            index //item value and its index
          ) => (
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item)
              }} //set selected index to make index equal to the clicked index, print it using passed in function onSelectItem
            >
              {item}
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default ListGroup;
