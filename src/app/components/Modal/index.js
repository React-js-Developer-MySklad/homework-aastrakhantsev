import html from './index.html';
import './styles.css';

let fnOnClose = () => { };

export function initModal(elem) {
    elem.innerHTML = html;
    document.getElementById('modal-create').addEventListener('click', e => onClose(e));
}

export function updateModal(data, f) {
    document.getElementById('modal-id').value = data.id;
    document.getElementById('modal-name').value = data.name || '';
    document.getElementById('modal-inn').value = data.inn || '';
    document.getElementById('modal-address').value = data.address || '';
    document.getElementById('modal-kpp').value = data.kpp || '';
    fnOnClose = f;
}

function onClose(e) {
    let data = new Object();
    data.id = document.getElementById('modal-id').value;
    data.name = document.getElementById('modal-name').value;
    data.inn = document.getElementById('modal-inn').value;
    data.address = document.getElementById('modal-address').value;
    data.kpp = document.getElementById('modal-kpp').value;
    if (validate(data)) {
	fnOnClose(data);
	document.getElementById('modal-close').click();
    }
}


function validate(data) {
    if (! /\d{12}/.test(data.inn)) {
	alert("ИНН должен содержать 12 цифр");
	return false;
    }
    if (! /\d{9}/.test(data.kpp)) {
	alert("КПП должен содержать 9 цифр");
	return false;
    }
    return true;
}