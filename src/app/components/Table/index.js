import './styles.css';
import html from './index.html';

import { COL_NAME, COL_INN, COL_ADDR, COL_KPP, COL_BUTTON } from './columns.js';

export const initTable = (elem) => elem.innerHTML = html;

export function updateTable(dataList, onRowClick, onDeleteRow) {
    let table = document.getElementById('table-data');
    while (table.hasChildNodes()) {
	table.removeChild(table.lastChild);
    }
    for (const data of dataList) {
	addRow(data, onRowClick, onDeleteRow);
    }
}

function addRow(data, onRowClick, onDeleteRow) {
    let table = document.getElementById('table-data');
    let tr = document.createElement('tr');
    for (let i = 0; i < 5; i++) {
	tr.appendChild(document.createElement('td'));
    }
    table.appendChild(tr);
    tr.addEventListener('click', e => onRowClick(data.id));

    updateRow(tr, data);
    tr.children.item(COL_BUTTON).innerHTML = "<button type='button'>Удалить</button>";
    tr.children.item(COL_BUTTON).firstChild.addEventListener('click', e => {
	onDeleteRow(data.id);
	e.stopPropagation();
    });
}

function updateRow(tr, data) {
    tr.children.item(COL_NAME).innerText = data.name;
    tr.children.item(COL_INN).innerText = data.inn;
    tr.children.item(COL_ADDR).innerText = data.address;
    tr.children.item(COL_KPP).innerText = data.kpp;
}
