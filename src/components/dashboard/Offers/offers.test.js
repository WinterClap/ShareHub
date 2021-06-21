import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { useState } from "react";
import { OffersMocked } from "../../../__mocks__/offers";
import { jsonTest } from "../../../dataTest";

const ParentComponent = ({ data, loading, initial }) => {
  const [locationQuery, setLocationQuery] = useState(initial);
  return (
    <OffersMocked
      loading={loading}
      locationQuery={locationQuery}
      setLocationQuery={setLocationQuery}
      data={data}
    ></OffersMocked>
  );
};
describe("<Offers />", () => {
  test("should read the testData.json", () => {
    const { container, getByText } = render(
      <>
        <ParentComponent initial="" loading={false} data={jsonTest} />
      </>
    );

    expect(container.firstChild).toBeTruthy();
    expect(getByText("Sibundoy")).toBeInTheDocument();
  });

  test("should not render information from testData.json. A text 'loading' should be rendered instead", () => {
    const { container, queryByText } = render(
      <>
        <ParentComponent initial="" loading={true} data={jsonTest} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).toBeInTheDocument();
    expect(queryByText("Sibundoy")).not.toBeInTheDocument();
  });
  test("should render information from testData.json. change text to 'searh for 'locationQuery' city/town'", () => {
    const { container, queryByText, getByTestId } = render(
      <>
        <ParentComponent initial="Sibundoy" loading={false} data={jsonTest} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).not.toBeInTheDocument();
    expect(getByTestId("locationQueryText")).toBeInTheDocument();
  });
  test("should not render information from testData.json due there is no enough. A text 'loading' should not be rendered", () => {
    const { container, queryByText } = render(
      <>
        <ParentComponent initial="" loading={false} data={[]} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).not.toBeInTheDocument();
    expect(queryByText("Sibundoy")).not.toBeInTheDocument();
  });
});
