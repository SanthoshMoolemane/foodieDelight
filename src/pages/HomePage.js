import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import RestaurantForm from "../components/RestaurantForm";
import RestaurantList from "../components/RestaurantList";
import {
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "../services/restaurantService";

// Home page component handling restaurant data and interactions

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  console.log("restaurants:", restaurants);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRestaurants();
      setRestaurants(result);
    };
    fetchData();
  }, []);

  const handleAddRestaurant = async (restaurant) => {
    if (editingRestaurant) {
      const updatedRestaurant = await updateRestaurant(
        editingRestaurant.id,
        restaurant
      );
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((r) =>
          r.id === editingRestaurant.id ? updatedRestaurant : r
        )
      );
      setEditingRestaurant(null);
    } else {
      const newRestaurant = await addRestaurant(restaurant);
      setRestaurants([...restaurants, newRestaurant]);
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
  };

  const handleDeleteRestaurant = async (id) => {
    await deleteRestaurant(id);
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((r) => r.id !== id)
    );
  };

  return (
    <Container className="p-3">
      <h1 className="mb-3 pt-5 flex text-center">Foodie Delight</h1>
      <RestaurantForm
        onSubmit={handleAddRestaurant}
        initialData={editingRestaurant}
      />
      <RestaurantList
        restaurants={restaurants}
        onDelete={handleDeleteRestaurant}
        onEdit={handleEditRestaurant}
      />
    </Container>
  );
};

export default HomePage;
