

import React, { useState, useEffect } from "react";
import { Alert, Table, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import ProductUpdateForm from "./productUpdateForm";
import { useNavigate } from "react-router-dom";

const SupervisorPage = () => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold selected category
  const supervisorEmail = localStorage.getItem("email");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    }

    if (supervisorEmail) {
      fetchProductCount(supervisorEmail);
      fetchProducts(supervisorEmail, selectedCategory); // Fetch products with selected category
    } else {
      setErrorMessage("Supervisor email not found in local storage.");
    }
  }, [supervisorEmail, selectedCategory]); // Include selectedCategory in dependency array

  const fetchProductCount = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/supervisorPage/count?supervisorEmail=${email}`
      );
      setProductCount(response.data.count);
    } catch (error) {
      console.error("Error fetching product count:", error);
      setErrorMessage("Failed to fetch product count. Please try again later.");
    }
  };

  const fetchProducts = async (email, category) => {
    // Modify fetchProducts function to include category parameter
    try {
      let url = `http://localhost:5000/api/product/supervisorPage?supervisorEmail=${email}`;
      if (category) {
        url += `&category=${category}`; // Append category to API request if selected
      }
      const response = await axios.get(url);
      if (response.data.length > 0) {
        setProducts(response.data);
        const uniqueCategories = Array.from(
          new Set(response.data.map((product) => product.productCategory))
        );
        setCategories(uniqueCategories);
      } else {
        setErrorMessage("No products found for this supervisor.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to fetch products. Please try again later.");
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-between">
        <div className="col-md-6">
          <h2>Supervisor Page</h2>
        </div>
        <div className="col-md-6 text-end">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <p>Supervisor Email: {supervisorEmail}</p>
      <p>Product Count: {productCount}</p>
      {errorMessage ? (
        <Alert variant="warning">{errorMessage}</Alert>
      ) : (
        <div>
          <Dropdown className="mb-5">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Categories
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedCategory("")}>
                All Categories
              </Dropdown.Item>
              {categories.map((category, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setSelectedCategory(category)} // Update selected category on click
                >
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Product Category</th>
                <th>Product Description</th>
                <th>Price</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>
                    {product.productImage && (
                      <img
                        src={`data:image/png;base64,${product.productImage}`}
                        alt="Product"
                        width="50"
                      />
                    )}
                  </td>

                  <td>{product.productCategory}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleUpdateClick(product)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {selectedProduct && (
            <ProductUpdateForm
              product={selectedProduct}
              onClose={handleCloseForm}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default SupervisorPage;
