import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantList from './RestaurantList';

const mockRestaurants = [
  { id: 1, name: 'Restaurant 1', description: 'Description 1', location: 'Location 1' },
  { id: 2, name: 'Restaurant 2', description: 'Description 2', location: 'Location 2' },
];

describe('RestaurantList', () => {
  test('renders restaurant list and handles edit and delete', () => {
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();
    render(<RestaurantList restaurants={mockRestaurants} onEdit={handleEdit} onDelete={handleDelete} />);

    expect(screen.getByText(/restaurant 1/i)).toBeInTheDocument();
    expect(screen.getByText(/description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/location 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getAllByText(/edit/i)[0]);
    fireEvent.click(screen.getAllByText(/delete/i)[0]);

    expect(handleEdit).toHaveBeenCalledWith(mockRestaurants[0]);
    expect(handleDelete).toHaveBeenCalledWith(mockRestaurants[0].id);
  });
});
