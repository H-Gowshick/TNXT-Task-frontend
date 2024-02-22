import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const ProductForm = ({ show, handleClose }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("adminEmail", adminEmail);
      formData.append("supervisorEmail", supervisorEmail);
      formData.append("productId", productId);
      formData.append("productName", productName);
      formData.append("productImage", e.target.productImage.files[0]);
      formData.append("productCategory", productCategory);
      formData.append("productDescription", productDescription);
      formData.append("price", price);

      const response = await fetch("http://localhost:5000/api/product/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      console.log(data.message);
      setAdminEmail("");
      setSupervisorEmail("");
      setProductId("");
      setProductName("");
      setProductImage("");
      setProductCategory("");
      setProductDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <div className="mt-5">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form
        onSubmit={handleSubmit}
        style={{ display: show ? "block" : "none" }}
      >
        <Form.Group controlId="adminEmail">
          <Form.Label>Admin Email</Form.Label>
          <Form.Control
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="supervisorEmail">
          <Form.Label>Supervisor Email</Form.Label>
          <Form.Control
            type="email"
            value={supervisorEmail}
            onChange={(e) => setSupervisorEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="productId">
          {" "}
          {/* Add product ID field */}
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className=" mt-4">
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose} className="ms-3 mt-4">
          Close
        </Button>{" "}
        {/* Close button */}
      </Form>
    </div>
  );
};

export default ProductForm;
