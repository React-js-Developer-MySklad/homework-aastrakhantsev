import html from "./app.html";
import './app.css'

import { initTable, updateTable } from './counteragents/table/app';
import { initModal, updateModal } from './counteragents/modal/app';

import myData from "./data.json";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

let nextId = 100;

function onSaveNew(data) {
    myData.push(data);
    redrawTable();
}

function indexById(id) {
    return myData.findIndex(el => el.id == id);
}

function onDeleteRow(id) {
    myData.splice(indexById(id), 1);
    redrawTable();
}

function onSaveExisting(data) {
    myData[indexById(data.id)] = data;
    redrawTable();
}

function onClickRow(id) {
    document.getElementById('show-modal').click();
    updateModal(myData[indexById(id)], onSaveExisting);
}

function redrawTable() {
    updateTable(myData, onClickRow, onDeleteRow);
}


initModal(document.getElementById('default-modal'));
initTable(document.getElementById('default-table'));

document.getElementById('data-modal').addEventListener("click", (event) => updateModal({id:nextId++}, onSaveNew));

redrawTable();
