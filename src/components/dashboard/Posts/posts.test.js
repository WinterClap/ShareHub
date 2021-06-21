import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { PostsMocked } from "../../../__mocks__/posts";
import { jsonTest } from "../../../dataTest";

const ParentComponent = ({ data, loading }) => {
  return <PostsMocked loading={loading} data={data}></PostsMocked>;
};
describe("<Offers />", () => {
  test("should read the testData.json", () => {
    const { container, getByText } = render(
      <>
        <ParentComponent loading={false} data={jsonTest} />
      </>
    );

    expect(container.firstChild).toBeTruthy();
    expect(getByText("fresh tomatoes for free")).toBeInTheDocument();
  });

  test("should not render information from testData.json. A text 'loading' should be rendered instead", () => {
    const { container, queryByText } = render(
      <>
        <ParentComponent loading={true} data={jsonTest} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).toBeInTheDocument();
    expect(queryByText("fresh tomatoes for free")).not.toBeInTheDocument();
  });
  test("should not render information from testData.json due there is no enough. A text 'loading' should not be rendered", () => {
    const { container, queryByText } = render(
      <>
        <ParentComponent loading={false} data={[]} />
      </>
    );
    expect(container.firstChild).toBeTruthy();
    expect(queryByText("LOADING...")).not.toBeInTheDocument();
    expect(queryByText("fresh tomatoes for free")).not.toBeInTheDocument();
  });
});
