import { render } from "@testing-library/react";
import Hello from "@/components/Hello";

test("renders the correct text", () => {
  const { getByText } = render(<Hello />);
  const heading = getByText(/Hello, World!/i);
  expect(heading).toBeInTheDocument();
});
