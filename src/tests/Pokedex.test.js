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

const POKEMON_NAME = 'pokemon-name';

describe('5. Teste o componente <Pokedex.js />', () => {
  // 5. Teste o componente <Pokedex.js />
  test('Teste se a página contém num "h2" o texto "Encountered pokémons"', () => {
    // Teste se a página contém um heading 'h2' com o texto 'Encountered pokémons'.
    renderWithRouter(<App />);
    const pokedexHeader = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexHeader).toBeInTheDocument();
  });

  test('É exibido o próximo pokémon da lista quando clica em "Próximo pokémon"', () => {
    // Teste se é exibido o próximo pokémon da lista quando o botão 'Próximo pokémon'
    // é clicado.
    renderWithRouter(<App />);

    const clickNextPkmn = () => {
      const nextPkmnBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      // // O botão deve conter o texto 'Próximo pokémon';
      expect(nextPkmnBtn).toBeInTheDocument();
      userEvent.click(nextPkmnBtn);
    };

    pokemons.forEach((pokemon, index) => {
      // // Os próximos pokémons da lista devem ser mostrados, um a um,
      // // ao clicar sucessivamente no botão;
      if (index === 0) {
        const currName = screen.getByTestId(POKEMON_NAME);
        expect(currName).toBeInTheDocument();
        expect(currName).toHaveTextContent(pokemon.name);
        expect(currName).not.toHaveTextContent(pokemons[pokemons.length - 1].name);

        clickNextPkmn();
      } else {
        const currName = screen.getByTestId(POKEMON_NAME);
        expect(currName).toBeInTheDocument();
        expect(currName).toHaveTextContent(pokemon.name);
        expect(currName).not.toHaveTextContent(pokemons[index - 1].name);

        clickNextPkmn();
      }
    });
    // // O primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver
    // // no último pokémon da lista;
    const currName0 = screen.getByTestId(POKEMON_NAME);
    expect(currName0).toBeInTheDocument();
    expect(currName0).toHaveTextContent(pokemons[0].name);
  });

  test('Teste se é mostrado apenas um pokémon por vez.', () => {
    // Teste se é mostrado apenas um pokémon por vez.
    renderWithRouter(<App />);

    const clickNextPkmn = () => {
      const nextPkmnBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextPkmnBtn);
    };

    pokemons.forEach(() => {
      const currNames = screen.getAllByTestId(POKEMON_NAME);
      expect(currNames.length).toBe(1);
      expect(currNames[0]).toBeInTheDocument();

      clickNextPkmn();
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    // Teste se a Pokédex tem os botões de filtro.
    renderWithRouter(<App />);
    // // Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição.
    const pkmnTypes = [];
    pokemons.forEach((pokemon, index) => {
      if (index === 0) pkmnTypes.push(pokemon.type);
      const debutType = pkmnTypes.find((pkmnType) => pkmnType === pokemon.type);
      if (!debutType) pkmnTypes.push(pokemon.type);
    });
    // console.log(pkmnTypes);
    // const allBtnHome = screen.getByRole('button', { name: /all/i });
    // expect(allBtnHome).toBeInTheDocument();
    const typesBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typesBtns.length).toBe(pkmnTypes.length);
    typesBtns.forEach((typeBtn, index) => {
      expect(typeBtn).toHaveTextContent(pkmnTypes[index]);
    });
    //
    // // A partir da seleção de um botão de tipo, a Pokédex deve circular somente
    // // pelos pokémons daquele tipo;
    const comparePkmnTypeXBtnType = (index, nextPkmnBtn) => {
      const pkmnCardType = screen.getByTestId('pokemon-type');
      expect(pkmnCardType).toHaveTextContent(pkmnTypes[index]);
      userEvent.click(nextPkmnBtn);
    };

    typesBtns.forEach((typeBtn, index) => {
      userEvent.click(typeBtn);
      const nextPkmnBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      // // O texto do botão deve corresponder ao 'nome do tipo', ex. 'Psychic';
      comparePkmnTypeXBtnType(index, nextPkmnBtn);
      comparePkmnTypeXBtnType(index, nextPkmnBtn);
      comparePkmnTypeXBtnType(index, nextPkmnBtn);
      // // O botão 'All' precisa estar sempre visível.
      const allBtn = screen.getByRole('button', { name: /all/i });
      expect(allBtn).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // Teste se a Pokédex contém um botão para resetar o filtro
    renderWithRouter(<App />);
    const clickNextPkmn = () => {
      const nextPkmnBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextPkmnBtn);
    };
    const clickAll = () => {
      pokemons.forEach((pokemon) => {
        const pkmnName = screen.getByTestId(POKEMON_NAME);
        expect(pkmnName).toHaveTextContent(pokemon.name);
        clickNextPkmn();
      });
    };
    clickAll();
    // // O texto do botão deve ser 'All';
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    // // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros)
    // // quando o botão 'All' for clicado;
    userEvent.click(allBtn);
    clickAll();
    // // Ao carregar a página, o filtro selecionado deverá ser 'All';
  });
});
