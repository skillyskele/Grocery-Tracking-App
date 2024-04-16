import { MouseEvent } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Johns Hopkins"]; //this could be the reception of groceries! and my message! should be REALLY easy.

  // Event Handler
  const handleClick = (event: MouseEvent) => console.log(event)

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group"></ul>
      {items.map(
        (
          item,
          index //item value and its index
        ) => (
          <li
            className="list-group-item "
            key={item} //usually item.id, each element of the <li> must have a key
            onClick={handleClick} //clean up code by just defining the handleClick at top
          >
            {item}
          </li>
        )
      )}
    </>
  );
}

export default ListGroup;
