import {
  render,
  fireEvent,
  getByPlaceholderText,
} from "@testing-library/react";
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
    const { getByText, getByPlaceholderText, debug } = render(<App />);

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    // userEvent.click(addButton); // deprecated code v13

    debug();

    fireEvent.change(inputElement, { target: { value: "Novo" } });

    // current correct code - v14
    fireEvent.click(addButton);

    debug();

    expect(getByText("Novo")).toBeInTheDocument();
  });
});
