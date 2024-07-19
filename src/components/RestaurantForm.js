import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// Form component for adding and editing restaurants

const RestaurantForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setLocation(initialData.location);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, location });
    setName("");
    setDescription("");
    setLocation("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Restaurant Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-3"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3">
        {initialData ? "Update" : "Submit"}
      </Button>
    </Form>
  );
};

export default RestaurantForm;
