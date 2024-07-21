import html from './index.html';
import { useState, useContext } from 'react';
import { ApiContext } from '../../ApiContext.tsx';
import './styles.css';
import { DataType } from '../../app.tsx';

interface IInitialData {
    index: int;
    id: int;
    row: DataType;
}

interface ModalProps {
    initialData: IInitalData;
}

export const Modal = (props: ModalProps) => {
    const { saveOne, saveRow, showModal } = useContext(ApiContext);
    const { initialData } = props;
    const [name, setName] = useState(initialData.row.name);
    const [inn, setInn] = useState(initialData.row.inn);
    const [address, setAddress] = useState(initialData.row.address);
    const [kpp, setKpp] = useState(initialData.row.kpp);

    const hideModal =() => {
	showModal(false)
    }

    const validate = () => {
	if (! /\d{12}/.test(inn)) {
	    alert("ИНН должен содержать 12 цифр");
	    return false;
	}
	if (! /\d{9}/.test(kpp)) {
	    alert("КПП должен содержать 9 цифр");
	    return false;
	}
	return true;
    }

    const clickSave = () => {
	if (validate()) {
	    let obj : DataType = {
		id: initialData.row.id,
		name: name,
		inn: inn,
		address: address,
		kpp: kpp
	    };
	    
	    saveOne(obj).then(r => {
		obj.id = r.id;
		saveRow(initialData.index, obj);
	    });
	}
    }

    return  (
    <div>
    <div id="default-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative" style={{width:'416px', margin: 'auto', marginTop: 'calc(50vh - 300px)'}}>
        <div className="relative bg-white rounded-lg p-4">
            <div className="flex px-2">
                <button type="button" className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={hideModal)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="p-2 text-xl font-semibold text-gray-500">Контрагент</div>
            <div className="p-2">
                <span>Наименование</span>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="p-2">
                <span>ИНН</span>
                <input type="text" value={inn} onChange={e => setInn(e.target.value)}/>
            </div>
            <div className="p-2">
                <span>Адрес</span>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
            </div>
            <div className="p-2">
                <span>КПП</span>
                <input type="text" value={kpp} onChange={e => setKpp(e.target.value)}/>
            </div>

            <div className="flex p-2">
                <button type="button" className="text-white bg-blue-700 font-medium rounded-lg text-sm px-2 py-2.5 text-center w-full" onClick={clickSave}>Сохранить</button>
                <button type="button" className="text-white bg-blue-700 font-medium rounded-lg text-sm px-2 py-2.5 text-center w-full" onClick={hideModal}>Отмена</button>
            </div>
        </div>
    </div>
    </div>
    <div modal-backdrop="" className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
    </div>
    );
};
