import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TextInput from './TextInput';

describe('TextInput Component - Edge Cases', () => {
  test('handles empty string value', () => {
    render(<TextInput label="Test" value="" onChange={vi.fn()} />);
    
    const input = screen.getByLabelText(/test/i);
    expect(input).toHaveValue('');
  });

  test('handles very long input value', () => {
    const longValue = 'a'.repeat(1000);
    render(<TextInput label="Long Input" value={longValue} onChange={vi.fn()} />);
    
    const input = screen.getByLabelText(/long input/i);
    expect(input).toHaveValue(longValue);
  });

  test('handles special characters in value', () => {
    const specialValue = 'test@email.com #$%^&*()';
    render(<TextInput label="Special" value={specialValue} onChange={vi.fn()} />);
    
    const input = screen.getByLabelText(/special/i);
    expect(input).toHaveValue(specialValue);
  });

  test('updates when value prop changes', () => {
    const { rerender } = render(<TextInput label="Test" value="initial" onChange={vi.fn()} />);
    
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
    
    rerender(<TextInput label="Test" value="updated" onChange={vi.fn()} />);
    
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('initial')).not.toBeInTheDocument();
  });
});