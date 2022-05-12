import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
// import FavoritePokemons from '../components/FavoritePokemons';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

const goToFavPage = () => {
  const link2fav = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(link2fav).toBeInTheDocument();

  userEvent.click(link2fav);
  // expect(history.location.pathname).toBe('/favorites');

  const favHeader = screen.getByRole('heading', {
    name: /Favorite pokémons/i,
    level: 2,
  });
  expect(favHeader).toBeInTheDocument();
};

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  // 3. Teste o componente <FavoritePokemons.js />
  test('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    // Teste se é exibida na tela a mensagem 'No favorite pokemon found',
    // caso a pessoa não tenha pokémons favoritos.
    renderWithRouter(<App />);

    goToFavPage();

    const noFavPknTxt = 'No favorite pokemon found';
    const fav404 = screen.getByText(noFavPknTxt);
    expect(fav404).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    // Teste se são exibidos todos os cards de pokémons favoritados.
    renderWithRouter(<App />);

    const go2DetailsAndFavPkmnAndBackHome = () => {
      const pkmnDetailsLink = screen.getByRole('link', { name: /More details/i });
      expect(pkmnDetailsLink).toBeInTheDocument();
      userEvent.click(pkmnDetailsLink);

      const favCheckbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      expect(favCheckbox).toBeInTheDocument();
      userEvent.click(favCheckbox);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      userEvent.click(homeLink);
    };

    go2DetailsAndFavPkmnAndBackHome();

    const nextPkmnBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPkmnBtn).toBeInTheDocument();
    userEvent.click(nextPkmnBtn);

    go2DetailsAndFavPkmnAndBackHome();
    goToFavPage();

    const favCards = screen.getAllByRole('img', { name: /is marked as favorite/i });
    expect(favCards.length).toBe(2);
    // screen.logTestingPlaygroundURL();
  });
});
