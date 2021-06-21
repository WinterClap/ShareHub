import "@testing-library/jest-dom/extend-expect";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { MyAccountMocked } from "../../../__mocks__/myAccount";

describe("<MyAccount />", () => {
  const file = new File(["(⌐□_□)"], "sharehub.png", { type: "image/png" });
  const handleFileChange = jest.fn();
  test("should render component", () => {
    const { container } = render(<MyAccountMocked handleFileChange={handleFileChange} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(handleFileChange).toHaveBeenCalledTimes(0);
  });

  test("cover photo upload. Check button functionality", async () => {
    const { getByTestId } = render(<MyAccountMocked handleFileChange={handleFileChange} />);
    let uploader = getByTestId("inputFileTestId");
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
    );
    let image = document.getElementById("inputFile");
    expect(image.files[0].name).toBe("sharehub.png");
    expect(image.files.length).toBe(1);
    expect(handleFileChange).toHaveBeenCalledTimes(1);
  });
});
