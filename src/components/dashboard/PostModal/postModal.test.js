import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render } from "@testing-library/react";
import { PostModalMocked } from "../../../__mocks__/postModal";
import { useState } from "react";
const ParentComponent = ({ initial }) => {
  const [showPostModal, setShowPostModal] = useState(initial);

  return (
    <PostModalMocked
      showPostModal={showPostModal}
      setShowPostModal={setShowPostModal}
      currentUser={{ email: "test@test.com" }}
    ></PostModalMocked>
  );
};

describe("<PostModal />", () => {
  test("should render the modal given the 'true' flag", () => {
    const { container, getByText, queryByTestId } = render(<ParentComponent initial={true}></ParentComponent>);
    expect(container.firstChild).toBeInTheDocument();
    expect(queryByTestId("cancelIco")).toBeInTheDocument();
  });
  test("should not render the modal given the 'false' flag", () => {
    const { container, getByText, queryByTestId } = render(<ParentComponent initial={false}></ParentComponent>);
    expect(container.firstChild).not.toBeInTheDocument();
    expect(queryByTestId("cancelIco")).not.toBeInTheDocument();
  });
  test("should render the modal given the 'true' flag then it should not render given the 'false' flag", () => {
    const { container, queryByTestId } = render(<ParentComponent initial={true}></ParentComponent>);
    expect(container.firstChild).toBeInTheDocument();
    expect(queryByTestId("cancelIco")).toBeInTheDocument();

    act(() => {
      fireEvent.click(queryByTestId("cancelIco"));
    });
    expect(queryByTestId("cancelIco")).not.toBeInTheDocument();
  });
  test("should select the 'Object' radio button", () => {
    const { container, queryByTestId, queryByLabelText } = render(<ParentComponent initial={true}></ParentComponent>);
    const radioInput = queryByLabelText("Food");

    act(() => {
      fireEvent.change(radioInput, { target: { value: "Object" } });
    });
    expect(radioInput.value).toBe("Object");
    act(() => {
      fireEvent.change(radioInput, { target: { value: "Other" } });
    });
    expect(radioInput.value).toBe("Other");
  });
  test("should change the inputs values", () => {
    const { container, queryByTestId, queryByLabelText } = render(<ParentComponent initial={true}></ParentComponent>);
    const titleInput = queryByTestId("titleInput");
    const cityInput = queryByTestId("cityInput");
    const addressInput = queryByTestId("addressInput");
    const descriptionInput = queryByTestId("descriptionInput");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "Title" } });
    });
    expect(titleInput.value).toBe("Title");

    act(() => {
      fireEvent.change(cityInput, { target: { value: "City" } });
    });
    expect(cityInput.value).toBe("City");
    act(() => {
      fireEvent.change(addressInput, { target: { value: "Address" } });
    });
    expect(addressInput.value).toBe("Address");
    act(() => {
      fireEvent.change(descriptionInput, { target: { value: "Description" } });
    });
    expect(descriptionInput.value).toBe("Description");
  });
});
