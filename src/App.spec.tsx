import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// test("Hello World is Truly", () => {
//   const { getByText } = render(<App />);

//   expect(getByText("Hello World")).toBeTruthy();
// });

// test("HasClassName - Test", () => {
//   const { getByText } = render(<App />);

//   expect(getByText("Hello World")).toHaveAttribute("class", "test");
// });

describe("App component", () => {
  it("should render list items", () => {
    const { getByText } = render(<App />);

    expect(getByText("Diego")).toBeInTheDocument();
    expect(getByText("Rodz")).toBeInTheDocument();
    expect(getByText("Mayk")).toBeInTheDocument();
  });

  it("should be able to add new item to the list", () => {
    const { getByText } = render(<App />);

    const addButton = getByText("Adicionar");

    // userEvent.click(addButton); // deprecated code v13

    // current correct code - v14
    fireEvent(
      addButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByText("Novo")).toBeInTheDocument();
  });
});
