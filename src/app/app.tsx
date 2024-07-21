import { React, useState, useEffect } from 'react';

import html from "./app.html";
import './app.css'

import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { loadAll, saveOne, deleteOne } from './service/Api/index.ts';
import { ApiContext } from './ApiContext.tsx';

export interface DataType {
    id: int;
    name: string;
    inn: string;
    addr: string;
    kpp: string;
}

export const App = () => {
    const [modalVisible, showModal] = useState(false);
    const [rows, setRows] = useState([]);
    const [modalState, setModalState] = useState({});

    const callLoader = () => {
    loadAll().then(r => {
	setRows(r);
	setModalState({index:-1, row: r[0]});
    });
    }

    useEffect(callLoader, []);

    const callForRow = (row: DataType, index: int) => {
	setModalState({index: index, row: row});
	showModal(true);
    }

    const saveRow = (index: int, row: DataType) => {
	if (index < 0) {
	    setRows([...rows, row]);
	} else {
	    const arr = [...rows];
	    arr[index] = row;
	    setRows(arr);
	}
	showModal(false);
    }

    const deleteRow = (index: int) => {
	const arr = [...rows];
	arr.splice(index, 1);
	setRows(arr);
    }
    // 

    return <ApiContext.Provider value={{ loadAll, deleteOne, saveOne, callForRow, deleteRow, saveRow, showModal }}>
	<Header onAddData={() => { callForRow({}, -1); } }/>
	<main>
	<Table rows={rows} />
	</main>
	{ modalVisible ? <Modal initialData={modalState} /> : null }
	<Footer/>
    </ApiContext.Provider>;
};