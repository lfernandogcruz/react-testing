import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

describe('4. Teste o componente <NotFound.js />', () => {
  // 4. Teste o componente <NotFound.js />
  test('A página contém um heading h2 com "Page requested not found 😭"?', () => {
    // Teste se a página contém um heading h2 com
    // o texto 'Page requested not found 😭';
    const { history } = renderWithRouter(<App />);
    history.push('/abuble');

    const notFoundHeading = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('', () => {
    // Teste se a página mostra a imagem
    // https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif
    const { history } = renderWithRouter(<App />);
    history.push('/abuble');

    const gifURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const gif404 = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(gif404).toBeInTheDocument();
    expect(gif404).toHaveAttribute('src', gifURL);
  });
});
// screen.logTestingPlaygroundURL();
