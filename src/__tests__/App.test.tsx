import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Hello World</h1>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input placeholder="Enter name" />
      <span role="note">Important Note</span>
    </div>
  );
};

test("renders hello world", () => {
  render(<App />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});

test("renders button", () => {
  render(<App />);
  expect(screen.getByRole("button")).toHaveTextContent("Increment");
});

test("initial count is 0", () => {
  render(<App />);
  expect(screen.getByTestId("count")).toHaveTextContent("Count: 0");
});

test("increments count on click", () => {
  render(<App />);
  const button = screen.getByText("Increment");
  fireEvent.click(button);
  expect(screen.getByTestId("count")).toHaveTextContent("Count: 1");
});

test("renders input box", () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
});

test("has note role element", () => {
  render(<App />);
  expect(screen.getByRole("note")).toBeInTheDocument();
});

test("input accepts text", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Enter name");
  fireEvent.change(input, { target: { value: "Abhishek" } });
  expect((input as HTMLInputElement).value).toBe("Abhishek");
});

test("button is clickable", () => {
  render(<App />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(screen.getByTestId("count")).toHaveTextContent("Count: 2");
});

test("heading has correct tag", () => {
  render(<App />);
  const heading = screen.getByText("Hello World");
  expect(heading.tagName).toBe("H1");
});

test("no text should match wrong text", () => {
  render(<App />);
  expect(screen.queryByText("Not Present")).toBeNull();
});
