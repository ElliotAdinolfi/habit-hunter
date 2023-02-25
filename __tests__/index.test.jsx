import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading & subheading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Habit Hunter/i,
    });

    const subheading = screen.getByText(
      'A simpler approach to building good habits'
    );

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });
});
