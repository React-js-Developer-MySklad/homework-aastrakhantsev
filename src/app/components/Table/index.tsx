import { React, useContext } from 'react';
import { ApiContext } from '../../ApiContext.tsx';

import './styles.css';
import html from './index.html';
import { DataType } from '../../app.tsx';

interface TableProps {
    rows: DataType[],
};

export const Table = (props: TableProps) => {
    const {rows } = props;
    const { callForRow, deleteRow, deleteOne } = useContext(ApiContext);

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
	    {rows.map((row: DataType, index: int) => (
	    <tr key={index} onClick={() => callForRow(row, index)}>
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
