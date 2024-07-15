import { React, useState, useEffect } from 'react';

import html from "./app.html";
import './app.css'

import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { loadAll, saveOne, deleteOne } from './service/Api/index.ts';
import { ApiContext } from './ApiContext.tsx';

let nextId = 100;

export const App = () => {
    //const myData = loadAll();
    const [modalVisible, showModal] = useState(false);
    const [rows, setRows] = useState([]);
    const [modalState, setModalState] = useState({});

    const callLoader = () => {
    loadAll().then(r => {
	setRows(r);
	setModalState({index:-1, row: r[0]});
console.log(r);
    });
    }

    useEffect(callLoader, []);

    function callForRow(row, index, saveRow) {
	setModalState({index: index, row: row, saveRow: saveRow});
	showModal(true);
    }

    function saveRow(index, row) {
	if (index < 0) {
	    setRows([...rows, row]);
	} else {
	    const arr = [...rows];
	    arr[index] = row;
	    setRows(arr);
	}
	showModal(false);
    }

    function deleteRow(index) {
	const arr = [...rows];
	arr.splice(index, 1);
	setRows(arr);
    }
    // 

    return <ApiContext.Provider value={{ loadAll, deleteOne, saveOne }}>
	<Header onAddData={() => { callForRow({id: 100}, -1, saveRow); } }/>
	<main>
	<Table rows={rows} callForRow={callForRow} saveRow={saveRow} deleteRow={deleteRow}/>
	</main>
	{ modalVisible ? <Modal hideModal={() => showModal(false)} initialData={modalState} /> : null }
	<Footer/>
    </ApiContext.Provider>;
};