import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import SearchInput from "./Search";

describe("SearchInput Component", () => {
  test("renders search input with default placeholder", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  test("renders with custom placeholder", () => {
    render(
      <SearchInput value="" onChange={vi.fn()} placeholder="Search users..." />
    );

    const searchInput = screen.getByPlaceholderText("Search users...");
    expect(searchInput).toBeInTheDocument();
  });

  test("displays initial value", () => {
    render(<SearchInput value="initial search" onChange={vi.fn()} />);

    const searchInput = screen.getByDisplayValue("initial search");
    expect(searchInput).toBeInTheDocument();
  });

  test("calls onChange with string when input changes", () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "test query" } });

    expect(mockOnChange).toHaveBeenCalledWith("test query");
    expect(mockOnChange).toHaveBeenCalledOnce();
  });

  test("renders search icon", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    const searchIcon = screen.getByTestId("SearchIcon");
    expect(searchIcon).toBeInTheDocument();
  });

  test("has correct Material-UI variant and size", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    // MUI TextField dengan variant outlined dan size small
    expect(searchInput).toHaveClass("MuiOutlinedInput-input");
    expect(searchInput.parentElement).toHaveClass("MuiOutlinedInput-root");
  });

  test("handles multiple change events", () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);

    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "first" } });
    fireEvent.change(searchInput, { target: { value: "second" } });
    fireEvent.change(searchInput, { target: { value: "third" } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(mockOnChange).toHaveBeenCalledWith("first");
    expect(mockOnChange).toHaveBeenCalledWith("second");
    expect(mockOnChange).toHaveBeenCalledWith("third");
  });

  test("updates displayed value when value prop changes", () => {
    const { rerender } = render(
      <SearchInput value="initial" onChange={vi.fn()} />
    );

    expect(screen.getByDisplayValue("initial")).toBeInTheDocument();

    rerender(<SearchInput value="updated" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue("updated")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("initial")).not.toBeInTheDocument();
  });
});
