import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Habit Hunter/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a subheading', () => {
    render(<Home />);

    const subheading = screen.getByRole('heading', {
      level: 2,
      name: /A habit tracker that lets you focus in on building life-long habits/i,
    });

    expect(subheading).toBeInTheDocument();
  });

  it('renders a button', () => {
    render(<Home />);

    const button = screen.getByRole('button', {
      name: /Start Tracking/i,
    });

    expect(button).toBeInTheDocument();
  });
});
