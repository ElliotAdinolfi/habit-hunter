import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  it('renders a heading', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push,
    }));

    render(
      <SessionProvider
        session={{
          user: { name: 'Test User', email: 'test@example.com' },
        }}
      >
        <Home />
      </SessionProvider>
    );

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Habit Hunter/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a subheading', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push,
    }));

    render(
      <SessionProvider
        session={{
          user: { name: 'Test User', email: 'test@example.com' },
        }}
      >
        <Home />
      </SessionProvider>
    );

    const subheading = screen.getByRole('heading', {
      level: 2,
      name: /A habit tracker that lets you focus in on building life-long habits/i,
    });

    expect(subheading).toBeInTheDocument();
  });

  it('renders a button', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push,
    }));

    render(
      <SessionProvider
        session={{
          user: { name: 'Test User', email: 'test@example.com' },
        }}
      >
        <Home />
      </SessionProvider>
    );

    const button = screen.getByRole('button', {
      name: /Start Tracking/i,
    });

    expect(button).toBeInTheDocument();
  });
});
