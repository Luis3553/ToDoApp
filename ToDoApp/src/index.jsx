import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './assets/css/index.css';
import { BrowserRouter } from 'react-router-dom';
import TasksMemory from './Memory/tasks.js';
import AuthMemory from './Memory/Auth.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <AuthMemory>
        <TasksMemory>
            <BrowserRouter>
                <div className='light-blue-circle circle-left'></div>
                <div className='light-blue-circle circle-right'></div>
                <App />
            </BrowserRouter>
        </TasksMemory>
    </AuthMemory>
    // </React.StrictMode>
);