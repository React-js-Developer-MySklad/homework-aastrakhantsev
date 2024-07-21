import { DataType } from '../../app.tsx';

const URL = "http://localhost:3000/counterparty";

export const loadAll = () => {
    return fetch(URL).then(r => r.json());
}

export const deleteOne = (id) => {
    return fetch(URL + "/" + id, {
        method: "DELETE"
    });
}

export const saveOne = (obj: DataType) => {
    return fetch(obj.id ? URL + "/" + obj.id : URL, {
        method: obj.id ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(r => r.json());
}


