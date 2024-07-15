import React from 'react';

import './styles.css';
import html from './index.html';

export const Table = (props) => {
    const {rows, callForRow, saveRow, deleteRow, ...rest} = props;
    return (
	<table className="w-full text-sm text-left">
            <thead>
            <tr>
                <th>
                    Название
                </th>
                <th>
                    ИНН
                </th>
                <th>
                    Адрес
                </th>
                <th>
                    КПП
                </th>
		<th></th>
            </tr>
            </thead>
            <tbody>
	    {rows.map((row, index) => (
	    <tr key={index} onClick={() => callForRow(row, index, saveRow)}>
		<td>{row.name}</td>
		<td>{row.inn}</td>
		<td>{row.address}</td>
		<td>{row.kpp}</td>
		<td><button type="button" onClick={e => { deleteRow(index); e.stopPropagation();} }>Удалить</button></td>
	    </tr>
	    ))}
            </tbody>
        </table>
    );
};
