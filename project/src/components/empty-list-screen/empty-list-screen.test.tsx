import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import HistoryRouter from "../history-route/history-route";
import EmptyListScreen from "./empty-list-screen";

const currentCity = 'Amsterdam';

describe('Component: EmptyListScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <EmptyListScreen currentCity={currentCity} />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('No places to stay available');
    const currentCityElement = screen.getByText(/Amsterdam/i);
    expect(headerElement).toBeInTheDocument();
    expect(currentCityElement).toBeInTheDocument();
  });
});
