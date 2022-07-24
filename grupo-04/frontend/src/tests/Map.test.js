import Map from '../components/Map/Map';
import React from 'react';
import { ReactDOM } from 'react';
import {render, screen, act, fireEvent, cleanup, prettyDOM} from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

test ('should render component', () => {
    let view = render(<BrowserRouter>
            <Map/>
            </BrowserRouter>);

        console.log(prettyDOM(view.container));

})