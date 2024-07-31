import html from './index.html';
import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { ApiContext } from '../../ApiContext.tsx';
import './styles.css';
import { DataType, useApi } from '../../app.tsx';

export const Modal = () => {
    const { saveOne, saveRow, showModal, modalVisible, modalState } = useApi();
    const [name, setName] = useState('');
    const [inn, setInn] = useState('');
    const [address, setAddress] = useState('');
    const [kpp, setKpp] = useState('');

    useEffect(() => {
	if (modalVisible) {
	    setName(modalState.index < 0 ? '' : modalState.row.name);
	    setInn(modalState.index < 0 ? '' : modalState.row.inn);
	    setKpp(modalState.index < 0 ? '' : modalState.row.kpp);
	    setAddress(modalState.index < 0 ? '' : modalState.row.address);
	}
    }, [modalVisible]);

    const hideModal =() => {
	showModal(false)
    }

    const validateForm = (values) => {
	const errors = {};
	if (! /^\d{12}$/.test(values.inn)) {
	    errors.inn = "ИНН должен содержать 12 цифр";
	}
	if (! /^\d{9}$/.test(values.kpp)) {
	    errors.kpp = "КПП должен содержать 9 цифр";
	}
	return errors;
    }

    const clickSave = (values) => {
	values.id = initialData.row.id;
	saveOne(values).then(r => {
	    values.id = r.id;
	    saveRow(initialData.index, values);
	});
    }

    return  (modalVisible &&
    <div>           	
    <div id="default-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative" style={{width:'416px', margin: 'auto', marginTop: 'calc(50vh - 300px)'}}>
        <div className="relative bg-white rounded-lg p-4">
	    <Form onSubmit={clickSave} validate={validateForm} initialValues={initialData.row}>
	    {({handleSubmit,values}) => (
	    <form onSubmit={handleSubmit}>
            <div className="flex px-2">
                <button type="button" className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={hideModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="p-2 text-xl font-semibold text-gray-500">Контрагент</div>
            <div className="p-2">
                <span>Наименование</span>
		<Field name="name" component="input" type="text" />
            </div>
            <div className="p-2">
		<Field name="inn">
		{({ input, meta }) => (
		<>
                <span>ИНН</span>
		<input {...input} type="text" />
		{meta.error && meta.touched && <div className="errorText">{meta.error}</div>}
		</>
		)}
		</Field>
            </div>
            <div className="p-2">
                <span>Адрес</span>
		<Field name="address" component="input" type="text" />
            </div>
            <div className="p-2">
		<Field name="kpp">
		{({ input, meta }) => (
		<>
                <span>КПП</span>
		<input {...input} type="text" />
		{meta.error && meta.touched && <div className="errorText">{meta.error}</div>}
		</>
		)}
		</Field>
            </div>

            <div className="flex p-2">
                <button type="button" className="text-white bg-blue-700 font-medium rounded-lg text-sm px-2 py-2.5 text-center w-full" type="submit">Сохранить</button>
                <button type="button" className="text-white bg-blue-700 font-medium rounded-lg text-sm px-2 py-2.5 text-center w-full" onClick={hideModal}>Отмена</button>
            </div>
	    </form>
	    )}
	    </Form>
        </div>
    </div>
    </div>
    <div modal-backdrop="" className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
    </div>
    );
};
