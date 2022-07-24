import Register from '../components/Register/Register';
import React from 'react';
import { render, screen, prettyDOM } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

let view = render(<BrowserRouter>
    <Register />
</BrowserRouter>);
test('should render Register', () => {
    console.log(prettyDOM(view.container));

})
test('Testeando el componente', () => {
    expect(screen).toBeDefined();
});

