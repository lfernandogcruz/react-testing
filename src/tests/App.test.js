import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('1. Teste o componente <App.js />', () => {
  // 1. Teste o componente <App.js />
  test('1.1. O topo da aplicação contém um conjunto fixo de links de navegação?', () => {
    // Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
    renderWithRouter(<App />);
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });

  test('1.1.1. O primeiro link deve possuir o texto "Home".', () => {
    // // O primeiro link deve possuir o texto 'Home'.
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[0]).toBeInTheDocument();
    // expect(const).toHaveTextContent(/texto qualquer/i);
  });

  test('1.1.2. O segundo link deve possuir o texto "About".', () => {
    // // O segundo link deve possuir o texto 'About'.
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[1]).toBeInTheDocument();
  });
  test('1.1.3. O terceiro link deve possuir o texto "Favorite Pokémons".', () => {
    // // O terceiro link deve possuir o texto 'Favorite Pokémons'.
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
    expect(links[2]).toBeInTheDocument();
  });

  test('1.2. A aplicação é redirecionada para a página inicial?', () => {
    // Teste se a aplicação é redirecionada para a página inicial, na URL '/' ao clicar
    // no link 'Home' da barra de navegação.
    const { history } = renderWithRouter(<App />);
    const link2home = screen.getByRole('link', { name: /home/i });
    userEvent.click(link2home);
    expect(history.location.pathname).toBe('/');
  });

  test('1.3. A aplicação é redirecionada para a página de "About"?', () => {
    // Teste se a aplicação é redirecionada para a página de 'About', na URL '/about',
    // ao clicar no link 'About' da barra de navegação.
    const { history } = renderWithRouter(<App />);
    const link2about = screen.getByRole('link', { name: /about/i });
    userEvent.click(link2about);
    expect(history.location.pathname).toBe('/about');
  });

  test('1.4 Aplicação é redirecionada para a página de "Pokémons Favoritados"?', () => {
    // Teste se a aplicação é redirecionada para a página de 'Pokémons Favoritados',
    // na URL '/favorites', ao clicar no link 'Favorite Pokémons' da barra de navegação.
    const { history } = renderWithRouter(<App />);
    const link2fav = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(link2fav);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('1.5. A aplicação é redirecionada para a página "Not Found"?', () => {
    // Teste se a aplicação é redirecionada para a página 'Not Found' ao entrar em uma URL
    // desconhecida.
    const { history } = renderWithRouter(<App />);
    history.push('/abuble');
    // screen.logTestingPlaygroundURL();
    const notFoundHeading = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
