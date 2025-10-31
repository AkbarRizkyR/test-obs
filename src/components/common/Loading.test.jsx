import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Loading from "./Loading";

describe("Loading Component", () => {
    test("renders loading component with default message", () => {
        render(<Loading />);

        // Check if CircularProgress is rendered
        const progress = screen.getByRole("progressbar");
        expect(progress).toBeInTheDocument();

        // Check if default message is rendered
        const message = screen.getByText("Loading...");
        expect(message).toBeInTheDocument();
        expect(message).toHaveClass("MuiTypography-h6");
    });

    test("renders with custom message", () => {
        const customMessage = "Please wait...";
        render(<Loading message={customMessage} />);

        const message = screen.getByText(customMessage);
        expect(message).toBeInTheDocument();
        expect(message).toHaveClass("MuiTypography-h6");
    });
    test("renders with correct MUI typography variant", () => {
        render(<Loading />);

        const typography = screen.getByText("Loading...");
        expect(typography).toHaveClass("MuiTypography-h6");
    });

    test("Box container has correct styling", () => {
        const { container } = render(<Loading />);

        const box = container.firstChild;
        expect(box).toHaveStyle({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
        });
    });

    test("renders without message when empty string provided", () => {
        render(<Loading message="" />);

        // Progressbar should still be visible
        const progress = screen.getByRole("progressbar");
        expect(progress).toBeInTheDocument();

        // No message should be displayed
        const typography = screen.queryByText("Loading...");
        expect(typography).not.toBeInTheDocument();
    });
});
