import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

const PIKACHU_URL = '/pokemons/25';

describe('6. Teste o componente <Pokemon.js />', () => {
  // 6. Teste o componente <Pokemon.js />
  test('Teste se é renderizado um card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const firstPkmn = pokemons[0];
    const FIRST_PKMN_NAME = firstPkmn.name;

    // console.log(firstPkmn);
    const pkmnName = screen.getByTestId('pokemon-name');
    // Teste se é renderizado um card com as informações de determinado pokémon.
    // console.log(pkmnName);
    expect(pkmnName).toBeInTheDocument();
    // // - O nome correto do pokémon deve ser mostrado na tela;
    expect(pkmnName).toHaveTextContent(FIRST_PKMN_NAME);
    // // - O tipo correto do pokémon deve ser mostrado na tela.
    const pkmnType = screen.getByTestId('pokemon-type');
    expect(pkmnType).toBeInTheDocument();
    expect(pkmnType).toHaveTextContent(firstPkmn.type);
    // // - O peso médio do pokémon deve ser exibido com um texto no formato
    // // 'Average weight: <value> <measurementUnit>'; onde <value> e <measurementUnit>
    // // são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    const AVERAGE_WEIGHT_VALUE = firstPkmn.averageWeight.value;
    const AVERAGE_WEIGHT_UNIT = firstPkmn.averageWeight.measurementUnit;
    expect(pkmnWeight).toBeInTheDocument();
    expect(pkmnWeight).toHaveTextContent(/Average weight:/i);
    expect(pkmnWeight).toHaveTextContent(AVERAGE_WEIGHT_VALUE);
    expect(pkmnWeight).toHaveTextContent(AVERAGE_WEIGHT_UNIT);

    // // - A imagem do pokémon deve ser exibida. Ela deve conter um atributo 'src' com a
    // // URL da imagem e um atributo 'alt' com o texto '<name> sprite',
    // // onde <name> é o nome do pokémon;
    const pkmnImg = screen.getByRole('img', {
      name: `${FIRST_PKMN_NAME} sprite`,
    });
    expect(pkmnImg).toBeInTheDocument();
    expect(pkmnImg).toHaveAttribute('alt', `${FIRST_PKMN_NAME} sprite`);
    expect(pkmnImg).toHaveAttribute('src', firstPkmn.image);
  });

  test('Teste se o card na Pokédex contém link de navegação para os "detalhes"', () => {
    // Teste se o card do pokémon indicado na Pokédex contém um link de navegação para
    // exibir detalhes deste pokémon. O link deve possuir a URL '/pokemons/<id>', onde
    // <id> é o id do pokémon exibido;
    const { history } = renderWithRouter(<App />);
    const pkmnDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(pkmnDetailsLink).toBeInTheDocument();
    expect(pkmnDetailsLink).toHaveAttribute('href', PIKACHU_URL);
    userEvent.click(pkmnDetailsLink);
    expect(history.location.pathname).toBe(PIKACHU_URL);
  });

  test('Teste se ao clicar no link de navegação, é feito o redirecionamento', () => {
    // Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento
    // da aplicação para a página de detalhes de pokémon.
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const pkmnDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(pkmnDetailsLink).toBeInTheDocument();
    userEvent.click(pkmnDetailsLink);
    expect(history.location.pathname).not.toBe('/');
    // expect(history.location.pathname).toBe(PIKACHU_URL);
  });

  test('Teste também se a URL exibida no navegador muda para "/pokemon/<id>"', () => {
    // Teste também se a URL exibida no navegador muda para '/pokemon/<id>', onde <id>
    // é o id do pokémon cujos detalhes se deseja ver;
    //
    // '__reactEventHandlers$r0wrmkg4yl': { 'data-testid': 'pokemon-name', children: 'Pikachu' }
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const pkmnDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(pkmnDetailsLink).toBeInTheDocument();
    userEvent.click(pkmnDetailsLink);
    // expect(history.location.pathname).not.toBe('/');
    expect(history.location.pathname).toBe(PIKACHU_URL);
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    // Teste se existe um ícone de estrela nos pokémons favoritados.
    renderWithRouter(<App />);
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

    const favStar = screen.getAllByRole('img');
    expect(favStar[1]).toBeInTheDocument();
    // // O ícone deve ser uma imagem com o atributo 'src' contendo o
    // // caminho '/star-icon.svg';
    expect(favStar[1]).toHaveAttribute('src', '/star-icon.svg');
    // // A imagem deve ter o atributo 'alt' igual a '<pokemon> is marked as favorite',
    // // onde <pokemon> é o nome do pokémon exibido.
    expect(favStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
// screen.logTestingPlaygroundURL();
