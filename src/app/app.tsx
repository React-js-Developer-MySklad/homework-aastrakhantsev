import { React, useContext } from 'react';

import html from "./app.html";
import './app.css'

import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ApiContext, ApiContextProvider } from './ApiContext.tsx';

export const useApi = () => {
    return useContext(ApiContext);
};

export const App = () => {
    return <ApiContextProvider>
	<Header/>
	<main>
	<Table/>
	</main>
	<Modal/>
	<Footer/>
    </ApiContextProvider>;
};