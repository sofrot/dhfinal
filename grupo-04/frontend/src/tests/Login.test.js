import Login from '../components/Login/Login';
import React from 'react';
import { ReactDOM } from 'react';
import { render, screen, act, fireEvent, cleanup, prettyDOM } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

let view = render(<BrowserRouter>
    <Login />
</BrowserRouter>);

test('should render Login', () => {
    console.log(prettyDOM(view.container));

});



