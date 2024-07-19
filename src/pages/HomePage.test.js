import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import * as restaurantService from '../services/restaurantService';

jest.mock('../services/restaurantService');

const mockRestaurants = [
  { id: 1, name: 'Restaurant 1', description: 'Description 1', location: 'Location 1' },
  { id: 2, name: 'Restaurant 2', description: 'Description 2', location: 'Location 2' },
];

describe('HomePage', () => {
  beforeEach(() => {
    restaurantService.getRestaurants.mockResolvedValue(mockRestaurants);
  });

  test('renders homepage and handles adding, editing, and deleting restaurants', async () => {
    render(<HomePage />);
    jest.setTimeout(10000);

    await waitFor(() => {
      expect(screen.getByText(/restaurant 1/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/enter name/i), { target: { value: 'New Restaurant' } });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByPlaceholderText(/enter location/i), { target: { value: 'New Location' } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/new restaurant/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/edit/i)[0]);
    fireEvent.change(screen.getByPlaceholderText(/enter name/i), { target: { value: 'Updated Restaurant' } });
    fireEvent.click(screen.getByText(/update/i));

    await waitFor(() => {
      expect(screen.getByText(/updated restaurant/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/delete/i)[0]);

    await waitFor(() => {
      expect(screen.queryByText(/updated restaurant/i)).not.toBeInTheDocument();
    });
  });
});
