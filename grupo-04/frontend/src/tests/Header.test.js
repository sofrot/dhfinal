import Header from '../components/Header/Header';
import React from 'react';
import { ReactDOM } from 'react';
import { render, screen, act, fireEvent, cleanup, prettyDOM } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
let view = render(<BrowserRouter>
        <Header />
    </BrowserRouter>);

test('should render component', () => {
    console.log(prettyDOM(view.container));
    /* const headerElement = screen.getByTestId('header1'); */
    //como mostrar el renderizado del componente
    /* expect(headerElement).toBeInTheDocument(); */
})

test('Testeando el slogan', () => {
    //  console.log(prettyDOM(component.container));
    expect(screen).toBeDefined();
});


