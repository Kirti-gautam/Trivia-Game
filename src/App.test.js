import { render, screen ,act, fireEvent, waitForElementToBeRemoved, } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Home from './components/Home/Home';

test('renders heading of trivia game', () => {
  render(<Home />);
  const linkElement = screen.getByText(/trivia game/i);
  expect(linkElement).toBeInTheDocument();
});

/*it("should show incorrect on button click ", async () => {
  render(<Home />)
  const fakeInput= "abcd";
  const ans = screen.getByRole('input',{name : "answer"});
  await userEvent.type(ans,fakeInput);
  await act(async() => {
    fireEvent.click(screen.getByText(/submit/i));
  });
  expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
});*/



