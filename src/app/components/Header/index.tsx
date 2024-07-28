import { React, useContext } from 'react';
import { useApi } from '../../app.tsx';
import { default as logo } from '../../assets/logo.svg';
import { default as plus } from '../../assets/plus.svg';

export const Header = () => {
    const { callForRow } = useApi();

    const onAddData = () => {
	callForRow({}, -1);
    }

    return (
	<header>
	    <div className="flex-grow">
    		<a href="http://www.moysklad.ru/"><img src={logo}/></a>
	    </div>
	    <div>
    		<button className="button-add-data" type="button" onClick={onAddData}>
        	    <img src={plus} style={{padding:'8px'}}/>
        	    <span style={{paddingTop: '5px'}}>Добавить</span>
    		</button>
	    </div>
	</header>
    );
};