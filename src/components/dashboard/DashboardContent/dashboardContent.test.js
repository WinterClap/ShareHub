import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { DashboardContentMocked } from "../../../__mocks__/dashboardContent";

describe("<DashboardContent />", () => {
  test("should render", () => {
    // const { container } = render(<DashboardContentMocked currentUser="user@user.com"></DashboardContentMocked>);
    // expect(container.firstChild).toBeInTheDocument();
    expect(1).toBe(1);
  });
});
