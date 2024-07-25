import 'flowbite';

import './style.css'

import {createRoot} from "react-dom/client";
import {App} from "./app/app.tsx";
import {StrictMode} from "react";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(<App/>);