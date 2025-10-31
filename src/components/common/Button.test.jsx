import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with label', () => {
    render(<Button label="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('renders button with ReactNode label', () => {
    render(<Button label={<span>Custom <strong>Label</strong></span>} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Custom Label');
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  test('applies correct color prop', () => {
    const { rerender } = render(<Button label="Test" color="primary" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorPrimary');

    rerender(<Button label="Test" color="secondary" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorSecondary');

    rerender(<Button label="Test" color="success" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorSuccess');

    rerender(<Button label="Test" color="error" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorError');
  });

  test('applies correct variant prop', () => {
    const { rerender } = render(<Button label="Test" variant="contained" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-contained');

    rerender(<Button label="Test" variant="outlined" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');

    rerender(<Button label="Test" variant="text" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-text');
  });

  test('applies fullWidth prop', () => {
    render(<Button label="Test" fullWidth />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
  });

  test('renders with start icon', () => {
    render(<Button label="Search" startIcon={<span data-testid="search-icon">🔍</span>} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    const searchIcon = screen.getByTestId('search-icon');
    
    expect(button).toContainElement(searchIcon);
    expect(button).toHaveTextContent('Search');
  });

  test('renders with end icon', () => {
    render(<Button label="Download" endIcon={<span data-testid="download-icon">📥</span>} />);
    
    const button = screen.getByRole('button', { name: /download/i });
    const downloadIcon = screen.getByTestId('download-icon');
    
    expect(button).toContainElement(downloadIcon);
  });

  test('applies custom sx styles', () => {
    render(<Button label="Test" />);
    const button = screen.getByRole('button');
    
    // Material-UI applies styles via classes, so we check for the classes
    expect(button).toHaveClass('MuiButton-root');
  });

  test('renders without label (empty button)', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  test('has correct default props', () => {
    render(<Button label="Test" />);
    const button = screen.getByRole('button');
    
    // Default props should be applied
    expect(button).toHaveClass('MuiButton-contained');
    expect(button).toHaveClass('MuiButton-colorPrimary');
    expect(button).not.toHaveClass('MuiButton-fullWidth');
    expect(button).not.toBeDisabled();
  });
});