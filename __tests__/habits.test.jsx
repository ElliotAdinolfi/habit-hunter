import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Habits from '../src/pages/habits';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Habits', () => {
  it('renders the logo', () => {
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
        <Habits />
      </SessionProvider>
    );

    const logo = screen.getByRole('heading', {
      level: 1,
      name: /Habit Hunter/i,
    });
    expect(logo).toBeInTheDocument();
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
        <Habits />
      </SessionProvider>
    );

    const button = screen.getByRole('button', {
      name: /Log Out/i,
    });

    expect(button).toBeInTheDocument();
  });
});
