import * as restaurantService from '../services/restaurantService';

describe('restaurantService', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('getRestaurants fetches and returns restaurants', async () => {
    const mockResponse = [
      { id: 1, name: 'Restaurant 1', description: 'Description 1', location: 'Location 1' },
      { id: 2, name: 'Restaurant 2', description: 'Description 2', location: 'Location 2' },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await restaurantService.getRestaurants();

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/restaurants');
  });

  test('addRestaurant posts new restaurant and returns it', async () => {
    const newRestaurant = { name: 'New Restaurant', description: 'New Description', location: 'New Location' };
    const mockResponse = { ...newRestaurant, id: 3 };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await restaurantService.addRestaurant(newRestaurant);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRestaurant),
    });
  });

  test('updateRestaurant puts updated restaurant and returns it', async () => {
    const updatedRestaurant = { id: 1, name: 'Updated Restaurant', description: 'Updated Description', location: 'Updated Location' };
    fetch.mockResponseOnce(JSON.stringify(updatedRestaurant));

    const result = await restaurantService.updateRestaurant(updatedRestaurant);

    expect(result).toEqual(updatedRestaurant);
    expect(fetch).toHaveBeenCalledWith('/api/restaurants/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRestaurant),
    });
  });

  test('deleteRestaurant deletes the restaurant', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const result = await restaurantService.deleteRestaurant(1);

    expect(result).toEqual({});
    expect(fetch).toHaveBeenCalledWith('/api/restaurants/1', {
      method: 'DELETE',
    });
  });
});
