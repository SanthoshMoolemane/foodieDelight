const mockRestaurants = [
  { id: 1, name: "Restaurant 1", description: "Description 1", location: "Location 1" },
  { id: 2, name: "Restaurant 2", description: "Description 2", location: "Location 2" }
];

let nextId = 3;

export const getRestaurants = async () => {
  return [...mockRestaurants];
};

export const addRestaurant = async (restaurant) => {
  const newRestaurant = { id: nextId++, ...restaurant };
  mockRestaurants.push(newRestaurant);
  return newRestaurant;
};

export const deleteRestaurant = async (id) => {
  const index = mockRestaurants.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockRestaurants.splice(index, 1);
  }
};

export const updateRestaurant = async (id, updatedRestaurant) => {
  const index = mockRestaurants.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockRestaurants[index] = { id, ...updatedRestaurant };
    return mockRestaurants[index];
  }
  return null;
};
