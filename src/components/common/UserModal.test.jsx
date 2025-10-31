import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import UserModal from './UserModal';
import { ThemeProvider, createTheme } from '@mui/material';

// Mock theme untuk testing
const theme = createTheme();

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  phone: '+1-234-567-8900',
  website: 'johndoe.com',
  image: 'https://example.com/avatar.jpg'
};

const MockThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('UserModal Component', () => {
  test('renders modal when open is true and user is provided', () => {
    render(
      <MockThemeProvider>
        <UserModal open={true} onClose={vi.fn()} user={mockUser} />
      </MockThemeProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('User Details')).toBeInTheDocument();
  });

  test('does not render modal when open is false', () => {
    render(
      <MockThemeProvider>
        <UserModal open={false} onClose={vi.fn()} user={mockUser} />
      </MockThemeProvider>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('returns null when user is not provided', () => {
    const { container } = render(
      <MockThemeProvider>
        <UserModal open={true} onClose={vi.fn()} user={null} />
      </MockThemeProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  test('displays user information correctly', () => {
    render(
      <MockThemeProvider>
        <UserModal open={true} onClose={vi.fn()} user={mockUser} />
      </MockThemeProvider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // ID
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('+1-234-567-8900')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
  });

  test('displays default values for missing user data', () => {
    const userWithMissingData = {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
      // missing username, phone, website
    };

    render(
      <MockThemeProvider>
        <UserModal open={true} onClose={vi.fn()} user={userWithMissingData} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getAllByText('-')).toHaveLength(3); // username, phone, website
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <MockThemeProvider>
        <UserModal open={true} onClose={mockOnClose} user={mockUser} />
      </MockThemeProvider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});