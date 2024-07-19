import React from "react";
import { Table, Button } from "react-bootstrap";

// Component for listing restaurants with edit and delete actions

const RestaurantList = ({ restaurants, onDelete, onEdit }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => (
          <tr key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>{restaurant.description}</td>
            <td>{restaurant.location}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => onEdit(restaurant)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(restaurant.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RestaurantList;
