import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import List from "./List";

// test("Hello World is Truly", () => {
//   const { getByText } = render(<List initialItems={["Diego", "Rodz", "Mayk"]} />);

//   expect(getByText("Hello World")).toBeTruthy();
// });

// test("HasClassName - Test", () => {
//   const { getByText } = render(<List initialItems={["Diego", "Rodz", "Mayk"]} />);

//   expect(getByText("Hello World")).toHaveAttribute("class", "test");
// });

describe("List component", () => {
  it("should render list items", async () => {
    const { getByText, rerender, queryByText } = render(
      <List initialItems={["Diego", "Rodz", "Mayk"]} />
    );

    expect(getByText("Diego")).toBeInTheDocument();
    expect(getByText("Rodz")).toBeInTheDocument();
    expect(getByText("Mayk")).toBeInTheDocument();

    rerender(<List initialItems={["Julia"]} />);

    expect(getByText("Julia")).toBeInTheDocument();
    expect(queryByText("Mayk")).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, findByText, getByPlaceholderText, debug } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    // userEvent.click(addButton); // deprecated code v13

    debug();

    fireEvent.change(inputElement, { target: { value: "Novo" } });

    // current correct code - v14
    fireEvent.click(addButton);

    debug();

    // sync tests
    // expect(getByText("Novo")).toBeInTheDocument();

    // async tests
    // expect(await findByText("Novo")).toBeInTheDocument();

    // alternative async tests
    await waitFor(() => {
      expect(getByText("Novo")).toBeInTheDocument();
    });
  });

  it("should be able to remove item to the list", async () => {
    const { getByText, getAllByText, queryByText } = render(
      <List initialItems={["Diego"]} />
    );

    const addButton = getByText("Adicionar");
    const removeButtons = getAllByText("Delete");

    fireEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getByText("Diego");
    // });

    // alternative remove
    await waitFor(
      () => {
        expect(queryByText("Diego")).not.toBeInTheDocument();
      },
      { interval: 500 }
    );
  });
});
