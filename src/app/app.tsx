import { React, useState } from 'react';

import html from "./app.html";
import './app.css'

import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export interface DataType {
    id: int;
    name: string;
    inn: string;
    addr: string;
    kpp: string;
}

import myData from "./data.json";

let nextId = 100;

export const App = () => {
    const [modalVisible, showModal] = useState(false);
    const [rows, setRows] = useState(myData);
    const [modalState, setModalState] = useState({index:-1, row: myData[0]});

    const callForRow = (row: DataType, index: int, saveRow: (int, DataType) => void) => {
	setModalState({index: index, row: row, saveRow: saveRow});
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

    return <>
	<Header onAddData={() => { callForRow({id: 100}, -1, saveRow); } }/>
	<main>
	<Table rows={rows} callForRow={callForRow} saveRow={saveRow} deleteRow={deleteRow}/>
	</main>
	{ modalVisible ? <Modal hideModal={() => showModal(false)} initialData={modalState} /> : null }
	<Footer/>
    </>;
};