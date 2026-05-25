import React, { useMemo, useState, useEffect } from "react";

import "./App.css";

export default function Counter() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Gaming ",
      price: 1200,
      category: "Electronics",
      rating: 4.5,
      stock: 12,
    },
    {
      id: 2,
      title: "Laptop",
      price: 900,
      category: "Electronics",
      rating: 4.7,
      stock: 12,
    },
    {
      id: 3,
      title: "Wireless Mouse",
      price: 400,
      category: "Accessories",
      rating: 3.5,
      stock: 12,
    },
    {
      id: 4,
      title: "Keyboard",
      price: 1900,
      category: "Accessories",
      rating: 2.5,
      stock: 12,
    },
    {
      id: 5,
      title: "iPhone 15",
      price: 50,
      category: "Mobile",
      rating: 4.5,
      stock: 12,
    },
    {
      id: 6,
      title: "Samsung Galaxy S23",
      price: 340,
      category: "Mobile",
      rating: 4.5,
      stock: 12,
    },
  ]);

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("all");

  const productData = useMemo(() => {
    let filtered = [...data];

    // Filter
    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Sort
    switch (sortBy) {
      case "lowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "highToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "topRated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return filtered;
  }, [data, category, sortBy]);

  function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleSortBY(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value);
  }

  const totalPages = Math.ceil(productData.length / 3);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * 3;

  const visibleItems = [...productData].splice(startIndex, 3);

  console.log((currentPage - 1) * 3, "CCC");
  console.log(visibleItems, "visibleItems");
  //currentPage
  //data.splice(3, 3)
  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <>
      <div>
        <select onChange={handleCategory} value={category}>
          <option value="all">All cate</option>
          <option value="Mobile">Mobile</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
        </select>

        <select className="ml-2" onChange={handleSortBY} value={sortBy}>
          <option value="all">Sort By</option>
          <option value="lowToHigh"> Price Low -- High</option>
          <option value="highToLow">Price High -- Low</option>
          <option value="topRated">Top Rated</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {visibleItems?.map(
            ({ id, title, price, category, rating, stock }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>{category}</td>
                  <td>{rating}</td>
                  <td>{stock}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
      <div style={{ display: "flex", margin: 10, justifyContent: "center" }}>
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
    </>
  );
}
