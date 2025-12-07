import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

const renderWithPath = (path = '/') => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

afterEach(() => {
  cleanup();
  window.history.pushState({}, '', '/');
});

describe('App routing and sections', () => {
  it('navigates to About section from nav', () => {
    renderWithPath('/');
    const aboutNav = screen.getAllByRole('button', { name: /about/i })[0];
    fireEvent.click(aboutNav);
    expect(screen.getByText(/About Frantz\./i)).toBeInTheDocument();
  });

  it('shows writing index when visiting /writing', () => {
    renderWithPath('/writing');
    expect(screen.getByText(/Research & Writing/i)).toBeInTheDocument();
    expect(screen.queryByText(/Back to Essays/i)).not.toBeInTheDocument();
  });

  it('renders Move 37 detail when visiting /writing/move-37', () => {
    renderWithPath('/writing/move-37');
    expect(screen.getByRole('heading', { name: /Move 37/i })).toBeInTheDocument();
    expect(screen.getByText(/Back to Essays/i)).toBeInTheDocument();
  });

  it('contact form exposes Netlify attributes', () => {
    const { container } = renderWithPath('/contact');
    const form = container.querySelector('form[name="contact"]');
    expect(form).not.toBeNull();
    expect(form).toHaveAttribute('name', 'contact');
    expect(form).toHaveAttribute('data-netlify', 'true');
    expect(form).toHaveAttribute('netlify', 'true');
    expect(form).toHaveAttribute('action', '/contact-success');
  });
});
