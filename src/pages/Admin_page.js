

import React, { useState, useEffect } from "react";
import { Button, Alert, ListGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SupervisorForm from "./SupervisorForm";
import ProductForm from "./ProductForm";

const AdminPage = () => {
  const [showSupervisorForm, setShowSupervisorForm] = useState(false);
  const [supervisorAccounts, setSupervisorAccounts] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showSupervisorAccounts, setShowSupervisorAccounts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    }

    const admin_email = localStorage.getItem("email");
    setAdminEmail(admin_email);
    fetchSupervisorCount(admin_email);
    fetchProductCount(admin_email);
  }, []);

  const fetchSupervisorCount = async (adminEmail) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/supervisor/count?adminEmail=${adminEmail}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supervisor count");
      }
      const data = await response.json();
      setSupervisorCount(data.count);
    } catch (error) {
      console.error("Error fetching supervisor count:", error);
      setErrorMessage(
        "Failed to fetch supervisor count. Please try again later."
      );
    }
  };

  const fetchSupervisorAccounts = async (adminEmail) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/supervisor/view?adminEmail=${adminEmail}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supervisor accounts");
      }
      const data = await response.json();
      setSupervisorAccounts(data);
      setShowSupervisorAccounts(true);
    } catch (error) {
      console.error("Error fetching supervisor accounts:", error);
      setErrorMessage(
        "Failed to fetch supervisor accounts. Please try again later."
      );
    }
  };

  const fetchProductCount = async (adminEmail) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/adminPage/count?adminEmail=${adminEmail}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product count");
      }
      const data = await response.json();
      setProductCount(data.count);
    } catch (error) {
      console.error("Error fetching product count:", error);
      setErrorMessage("Failed to fetch product count. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleCreateProductClose = () => {
    // Set showProductForm to false to hide the ProductForm modal
    setShowProductForm(false);
  };

  const handleSupervisorAccountsClose = () => {
    // Set showSupervisorAccounts to false to hide the SupervisorAccounts modal
    setShowSupervisorAccounts(false);
  };

  const handleCreateSupervisorAccountClose = () => {
    // Set showSupervisorForm to false to hide the SupervisorForm modal
    setShowSupervisorForm(false);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Page</h2>

        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {adminEmail && (
        <div>
          <p>Admin Email: {adminEmail}</p>
          {supervisorCount > 0 ? (
            <p>Supervisor Accounts Created: {supervisorCount}</p>
          ) : (
            <Alert variant="warning">Supervisor account not created yet.</Alert>
          )}
          {productCount > 0 ? (
            <p>Products Created: {productCount}</p>
          ) : (
            <Alert variant="warning">Products not yet created.</Alert>
          )}
        </div>
      )}
      <Button
        variant="primary"
        className="me-3 mt-5"
        onClick={() => fetchSupervisorAccounts(adminEmail)}
      >
        Supervisor Accounts View
      </Button>

      <Modal
        show={showSupervisorAccounts}
        onHide={handleSupervisorAccountsClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Supervisor Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {supervisorAccounts.map((account, index) => (
              <ListGroup.Item key={index}>
                <p>Email: {account.supervisorEmail}</p>
                <p>Password: {account.supervisorPassword}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSupervisorAccountsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant="primary"
        className="me-3 mt-5"
        onClick={() => setShowSupervisorForm(true)}
      >
        Create Supervisor Account
      </Button>

      {showSupervisorForm && (
        <SupervisorForm
          adminEmail={adminEmail}
          handleClose={handleCreateSupervisorAccountClose}
        />
      )}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Button
        variant="primary"
        className=" mt-5"
        onClick={() => setShowProductForm(true)}
      >
        Create Product
      </Button>

      {/* Pass handleClose function to ProductForm component */}
      <ProductForm
        adminEmail={adminEmail}
        show={showProductForm}
        handleClose={handleCreateProductClose}
      />
    </div>
  );
};

export default AdminPage;
