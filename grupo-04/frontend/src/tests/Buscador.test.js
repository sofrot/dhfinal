import Buscador from '../components/Buscador/Buscador';
import React from 'react';
import { ReactDOM } from 'react';
import {render, screen, act, fireEvent, cleanup} from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

test ('should render component', () => {
    render(<Buscador />);
    const buscadorElement = screen.getByTestId('buscador1');
    expect(buscadorElement).toBeInTheDocument();
})
