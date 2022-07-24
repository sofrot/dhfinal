import Footer from '../components/Footer/Footer';
import React from 'react';
import { ReactDOM } from 'react';
import {render, screen, act, fireEvent, cleanup} from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

test ('should render component', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer1');
    expect(footerElement).toBeInTheDocument();
})