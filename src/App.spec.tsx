import { render } from "@testing-library/react";
import App from "./App";

test("num", () => {
  const { getByText } = render(<App />);

  expect(getByText("Hello World")).toHaveAttribute("class", "test");
});
