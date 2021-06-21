import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { ModalInfo } from "./modalInfo";

describe("<ModalInfo />", () => {
  test("should not render the modal component", () => {
    const ModalParent = () => {
      const [showAddressModalState, setShowAddressModalState] = useState(false);
      return (
        <ModalInfo id="id" showAddressModal={showAddressModalState} setShowAddressModal={setShowAddressModalState} />
      );
    };
    const { queryByText } = render(<ModalParent />);
    expect(queryByText("Your gift is waiting for you!")).not.toBeInTheDocument();
  });
  test("should render the modal component", () => {
    const ModalParent = () => {
      const [showAddressModalState, setShowAddressModalState] = useState(true);
      return (
        <ModalInfo id="id" showAddressModal={showAddressModalState} setShowAddressModal={setShowAddressModalState} />
      );
    };
    const { getByText } = render(<ModalParent />);
    expect(getByText("Your gift is waiting for you!")).toBeInTheDocument();
  });
  test("should not render the modal component when clicked in 'close' button", () => {
    const handleClick = () => {};
    const ModalParent = () => {
      const [showAddressModalState, setShowAddressModalState] = useState(true);
      return (
        <>
          <ModalInfo
            id="id"
            showAddressModal={showAddressModalState}
            setShowAddressModal={setShowAddressModalState}
          ></ModalInfo>
          <button data-testid="CloseButton" onClick={() => setShowAddressModalState(false)}></button>
        </>
      );
    };
    const { queryByText, getByTestId, getByText } = render(<ModalParent />);
    expect(getByText("Your gift is waiting for you!")).toBeInTheDocument();
    act(() => {
      fireEvent.click(getByTestId("CloseButton"));
    });
    expect(queryByText("Your gift is waiting for you!")).not.toBeInTheDocument();
  });
});
