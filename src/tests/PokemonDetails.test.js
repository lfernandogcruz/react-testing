import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
// import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

describe('7. Teste o componente <PokemonDetails.js />', () => {
  // 7. Teste o componente <PokemonDetails.js />
  test('As informações detalhadas do pokémon selecionado são mostradas na tela?', () => {
    // Teste se as informações detalhadas do pokémon selecionado são mostradas na tela.
    renderWithRouter(<App />);
    const pkmnDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(pkmnDetailsLink).toBeInTheDocument();
    userEvent.click(pkmnDetailsLink);
    // // A página deve conter um texto '<name> Details', onde <name> é o nome do pokémon;
    const pkmnDetailsText = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(pkmnDetailsText).toBeInTheDocument();
    // // Não deve existir o link de navegação para os detalhes do pokémon selecionado.
    expect(pkmnDetailsLink).not.toBeInTheDocument();
    // // A seção de detalhes deve conter um heading 'h2' com o texto 'Summary'.
    const summaryText = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summaryText).toBeInTheDocument();
    // // A seção de detalhes deve conter um parágrafo com o resumo do pokémon
    // // específico sendo visualizado.
    const PARAGRAPH_PT1 = 'This intelligent Pokémon roasts hard berries ';
    const PARAGRAPH_PT2 = 'with electricity to make them tender enough to eat.';
    const PARAGRAPH_COMPLETE = `${PARAGRAPH_PT1}${PARAGRAPH_PT2}`;
    expect(PARAGRAPH_COMPLETE).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  test('Existe na página uma seção com os mapas contendo as localizações?', () => {
    // Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
    renderWithRouter(<App />);
    const pkmnDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(pkmnDetailsLink).toBeInTheDocument();
    userEvent.click(pkmnDetailsLink);
    // screen.logTestingPlaygroundURL();
    // // - Na seção de detalhes deverá existir um heading 'h2' com o texto
    // // 'Game Locations of <name>'; onde <name> é o nome do pokémon exibido.
    const pkmnLocationsHeading = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(pkmnLocationsHeading).toBeInTheDocument();
    // // - Todas as localizações do pokémon devem ser mostradas na seção de detalhes;
    const pkmnLocationsMaps = screen.getByRole('img', {
      name: 'Pikachu location',
    });
    pkmnLocationsMaps.forEach((map) => {
      expect(map).toBeInTheDocument();
    });
    // // - Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;
    // // - A imagem da localização deve ter um atributo 'src' com a URL da localização;
    // // - A imagem da localização deve ter um atributo 'alt' com o texto '<name> location',
    // // onde <name> é o nome do pokémon;
  });
  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    // Teste se o usuário pode favoritar um pokémon através da página de detalhes.
    // // - A página deve exibir um 'checkbox' que permite favoritar o pokémon;
    // // - Cliques alternados no 'checkbox' devem adicionar e remover respectivamente
    // // o pokémon da lista de favoritos;
    // // - O 'label' do 'checkbox' deve conter o texto 'Pokémon favoritado?';
  });
});
// screen.logTestingPlaygroundURL();
