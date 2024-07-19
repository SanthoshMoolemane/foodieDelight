import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantForm from './RestaurantForm';

describe('RestaurantForm', () => {
  test('renders form and submits data', () => {
    const handleSubmit = jest.fn();
    render(<RestaurantForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/enter name/i), { target: { value: 'Test Restaurant' } });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText(/enter location/i), { target: { value: 'Test Location' } });

    fireEvent.click(screen.getByText(/submit/i));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Test Restaurant',
      description: 'Test Description',
      location: 'Test Location',
    });
  });

  test('renders form with initial data and updates data', () => {
    const initialData = { name: 'Initial Name', description: 'Initial Description', location: 'Initial Location' };
    const handleSubmit = jest.fn();
    render(<RestaurantForm onSubmit={handleSubmit} initialData={initialData} />);

    expect(screen.getByPlaceholderText(/enter name/i).value).toBe(initialData.name);
    expect(screen.getByPlaceholderText(/enter description/i).value).toBe(initialData.description);
    expect(screen.getByPlaceholderText(/enter location/i).value).toBe(initialData.location);

    fireEvent.change(screen.getByPlaceholderText(/enter name/i), { target: { value: 'Updated Name' } });
    fireEvent.click(screen.getByText(/update/i));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Updated Name',
      description: 'Initial Description',
      location: 'Initial Location',
    });
  });
});
