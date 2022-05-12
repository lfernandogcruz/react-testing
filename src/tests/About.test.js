import React from 'react';
import { render, screen } from '@testing-library/react';
// import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import About from '../components/About';

// const renderWithRouter = (component) => {
//   const history = createMemoryHistory();
//   return {
//     ...render(<Router history={history}>{component}</Router>),
//     history,
//   };
// };

describe('2. Teste o componente <About.js />.', () => {
  // 2. Teste o componente <About.js />.
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    // Teste se a página contém as informações sobre a Pokédex.
  });

  test('Teste se a página contém um heading h2 com o texto "About Pokédex".', () => {
    // Teste se a página contém um heading h2 com o texto 'About Pokédex'.
    render(<About />);
    const aboutHeaderTxt = 'About Pokédex';
    const aboutHeader = screen.getByRole('heading', { name: aboutHeaderTxt, level: 2 });
    expect(aboutHeader).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // Teste se a página contém dois parágrafos com texto sobre a Pokédex.
    render(<About />);

    const aboutP1pt1 = 'This application simulates a Pokédex, ';
    const aboutP1pt2 = 'a digital encyclopedia containing all Pokémons';
    const aboutP1all = `${aboutP1pt1}${aboutP1pt2}`;
    const aboutP2pt1 = 'One can filter Pokémons by type, ';
    const aboutP2pt2 = 'and see more details for each one of them';
    const aboutP2all = `${aboutP2pt1}${aboutP2pt2}`;

    const aboutP1 = screen.getByText(aboutP1all);
    expect(aboutP1).toBeInTheDocument();

    const aboutP2 = screen.getByText(aboutP2all);
    expect(aboutP2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem alvo de uma Pokédex', () => {
    // Teste se a página contém a seguinte imagem de uma Pokédex:
    // https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.pn
    // g/800px-Gen_I_Pok%C3%A9dex.png.
    render(<About />);

    const imgURLpt1 = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9';
    const imgURLpt2 = 'dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgUrl = `${imgURLpt1}${imgURLpt2}`;

    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imgUrl);
  });
  // screen.logTestingPlaygroundURL();
});
