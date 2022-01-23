import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Availity Registration', () => {
  render(<App />);
  const h1Element = screen.getByText(/availity registration/i);
  expect(h1Element).toBeInTheDocument();
});
