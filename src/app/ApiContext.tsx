import { createContext, useState, useEffect } from 'react';
import { loadAll, saveOne, deleteOne } from './service/Api/index.ts';

export const ApiContext = createContext("");

export interface DataType {
    id: int;
    name: string;
    inn: string;
    addr: string;
    kpp: string;
}

export const ApiContextProvider = ({children}) => {
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

    return (
	<ApiContext.Provider 
		value={{ deleteOne, saveOne, callForRow, deleteRow, saveRow, rows, showModal, modalVisible, modalState }} >
	{ children }
	</ApiContext.Provider>
    );

};