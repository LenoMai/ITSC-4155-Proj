import TaskView from "./components/taskView";
import Messages from "./components/messages";
import SignUp from "./components/SignUp";
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import React from 'react';
import './css/signup.css';

function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/tasks/view" element={<TaskView />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </BrowserRouter>
    </div>


  );
}

export default App;
