import './app.css';
import html from './app.html';

export function initTable(elem) {
    elem.innerHTML = html;
}

export function updateTable(dataList, onRowClick, onDeleteRow) {
    let table = document.getElementById('table-data');
    while (table.hasChildNodes()) table.removeChild(table.lastChild);
    dataList.forEach(data => addRow(data, onRowClick, onDeleteRow));
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
    tr.children.item(4).innerHTML = "<button type=\"button\">Удалить</button>";
    tr.children.item(4).firstChild.addEventListener('click', e => {
	onDeleteRow(data.id);
	e.stopPropagation();
    });
}

function updateRow(tr, data) {
    tr.children.item(0).innerText = data.name;
    tr.children.item(1).innerText = data.inn;
    tr.children.item(2).innerText = data.address;
    tr.children.item(3).innerText = data.kpp;
}
