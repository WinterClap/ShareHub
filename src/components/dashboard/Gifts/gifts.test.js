import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { GiftsMocked } from "../../../__mocks__/gifts";
import { jsonTest } from "../../../dataTest";

const ParentComponent = ({ data, loading, initial }) => {
  const [showAddressModal, setShowAddressModal] = useState(initial);
  return (
    <GiftsMocked
      loading={loading}
      showAddressModal={showAddressModal}
      setShowAddressModal={setShowAddressModal}
      gifts={data}
    ></GiftsMocked>
  );
};

describe("<Gifts />", () => {
  test("should render the data from the json. State Loading is false", () => {
    const { container, getByText } = render(
      <>
        <ParentComponent initial={false} loading={false} data={jsonTest} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(getByText("Sibundoy")).toBeInTheDocument();
  });
  test("should not render the data from the json. State Loading is true", () => {
    const { container, queryByText } = render(
      <>
        <ParentComponent initial={false} loading={true} data={jsonTest} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).toBeInTheDocument();
    expect(queryByText("Sibundoy")).not.toBeInTheDocument();
  });
  test("should not render the empty data from the json. State Loading is false", () => {
    const { container, queryByText } = render(
      <>
        <ParentComponent initial={false} loading={false} data={[]} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).not.toBeInTheDocument();
    expect(queryByText("Sibundoy")).not.toBeInTheDocument();
  });

  test("should not render the modal at first. After click event, it should render the modal component", () => {
    const { getByTestId, getByText, queryByText } = render(
      <>
        <ParentComponent initial={false} loading={false} data={jsonTest} />
      </>
    );
    expect(queryByText("Your gift is waiting for you!")).not.toBeInTheDocument();
    act(() => {
      fireEvent.click(getByTestId("viewButton"));
    });
    expect(getByText("Your gift is waiting for you!")).toBeInTheDocument();
  });
});
