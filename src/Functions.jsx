import React from "react";

function Functions() {
  //   function can be called in 4 ways

  function showMessage(params) {
    return params + "  hello world";
  }

  showMessage("Abhishek");

  let show = new showMessage();
  console.log(show, "Show");

  let call = showMessage.call();
  console.log(call, "call");

  return <div>Functions</div>;
}



export default function ProductInventoryChallengeDemo() {
  const products = [
    {
      id: 1,
      title: 'Gaming Laptop',
      category: 'Electronics',
      price: 1200,
      rating: 4.5,
      stock: 12,
    },
    {
      id: 2,
      title: 'Wireless Mouse',
      category: 'Accessories',
      price: 45,
      rating: 4.1,
      stock: 30,
    },
    {
      id: 3,
      title: 'Mechanical Keyboard',
      category: 'Accessories',
      price: 90,
      rating: 4.7,
      stock: 0,
    },
    {
      id: 4,
      title: 'iPhone 15',
      category: 'Mobiles',
      price: 999,
      rating: 4.8,
      stock: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Product Inventory Dashboard</h1>
          <p className="text-gray-600 mt-2">
            HackerRank-style frontend interview challenge demo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-3xl font-bold mt-2">124</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Out Of Stock</p>
            <h2 className="text-3xl font-bold mt-2">8</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Total Inventory Value</p>
            <h2 className="text-3xl font-bold mt-2">$54,000</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Top Rated Product</p>
            <h2 className="text-xl font-bold mt-2">iPhone 15</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 space-y-5">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <input
              placeholder="Search by title or category"
              className="border rounded-xl px-4 py-3 w-full lg:w-96"
            />

            <div className="flex flex-wrap gap-3">
              <select className="border rounded-xl px-4 py-3">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Mobiles</option>
              </select>

              <select className="border rounded-xl px-4 py-3">
                <option>Sort By</option>
                <option>Price Low → High</option>
                <option>Price High → Low</option>
                <option>Top Rated</option>
              </select>

              <button className="bg-black text-white px-5 py-3 rounded-xl">
                Add Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Select</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <input type="checkbox" />
                    </td>

                    <td className="p-4 font-medium">{product.title}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">⭐ {product.rating}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          product.stock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : 'Out of stock'}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                          Edit
                        </button>

                        <button className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-gray-600 text-sm">
              Showing 1-10 of 124 products
            </div>

            <div className="flex gap-2">
              <button className="border px-4 py-2 rounded-lg">
                Previous
              </button>

              <button className="bg-black text-white px-4 py-2 rounded-lg">
                1
              </button>

              <button className="border px-4 py-2 rounded-lg">
                2
              </button>

              <button className="border px-4 py-2 rounded-lg">
                3
              </button>

              <button className="border px-4 py-2 rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-2xl font-bold mb-4">Challenge Requirements</h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Core Features</h3>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>API integration</li>
                <li>Search + filters</li>
                <li>Sorting</li>
                <li>Pagination</li>
                <li>CRUD operations</li>
              </ul>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Advanced Features</h3>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>Bulk delete</li>
                <li>Debounced search</li>
                <li>Optimistic updates</li>
                <li>Memoization</li>
                <li>Error handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export default Functions;
