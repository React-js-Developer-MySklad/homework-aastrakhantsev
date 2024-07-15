import { React, useContext } from 'react';
import { ApiContext } from '../../ApiContext.tsx';

import './styles.css';
import html from './index.html';

export const Table = (props) => {
    const {rows, callForRow, saveRow, deleteRow, ...rest} = props;
    const { deleteOne } = useContext(ApiContext);

    const onDelete = (e, id, index) => {
	deleteOne(id).then(r => deleteRow(index));
	e.stopPropagation();
    }

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
		<td><button type="button" onClick={e => onDelete(e, row.id, index) }>Удалить</button></td>
	    </tr>
	    ))}
            </tbody>
        </table>
    );
};