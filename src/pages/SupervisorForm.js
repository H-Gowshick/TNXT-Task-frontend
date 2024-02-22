import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const SupervisorForm = ({ handleClose }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [supervisorPassword, setSupervisorPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateSupervisor = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/supervisor/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminEmail,
            supervisorEmail,
            supervisorPassword,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create supervisor account");
      }
      setSuccessMessage("Supervisor account created successfully");
      setAdminEmail("");
      setSupervisorEmail("");
      setSupervisorPassword("");
    } catch (error) {
      console.error("Error creating supervisor account:", error);
      setError("Failed to create supervisor account. Please try again later.");
    }
  };

  return (
    <div className="mt-5">
      <h3>Create Supervisor Account</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleCreateSupervisor}>
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
        <Form.Group controlId="supervisorPassword">
          <Form.Label>Supervisor Password</Form.Label>
          <Form.Control
            type="password"
            value={supervisorPassword}
            onChange={(e) => setSupervisorPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Create Account
        </Button>
        <Button variant="secondary" onClick={handleClose} className="mt-3 ms-3">
          Close
        </Button>{" "}
        {/* Close button */}
      </Form>
    </div>
  );
};

export default SupervisorForm;
