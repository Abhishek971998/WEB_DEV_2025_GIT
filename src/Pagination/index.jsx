/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Pagination = ({ items, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems_ = items.slice(startIndex, startIndex + itemsPerPage);
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15];
  let visibleItems = [...items].splice(startIndex, itemsPerPage);

  // console.log(items.splice(startIndex, itemsPerPage), "SPLICE");
  // console.log(visibleItems, "visibleItems");

  // console.log(arr.slice(5, 5), "sliceeeee");
  // console.log(arr.splice(5, 5), "sppppppp ");

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div>
      <ul>
        {visibleItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            style={{
              margin: "0 4px",
              backgroundColor: currentPage === i + 1 ? "#333" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#000",
              padding: "4px 8px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  let arr = [];
  for (let i = 1; i <= 40; i++) {
    arr.push(`Item ${i}`);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Pagination</h1>
      <Pagination items={arr} itemsPerPage={5} />
    </div>
  );
};

export default App;
