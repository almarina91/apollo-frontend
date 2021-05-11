import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Days } from './components/pages/Days';
import { Intervals } from './components/pages/Intervals';
import { Plans } from './components/pages/Plans';
import { PlanProvider } from './context/context'
import { Timer } from "./components/Timer/Timer";
import { Finished } from './components/Timer/Finished';
import { EditUser } from "./components/EditUser/EditUser";
import { AdminPage } from "./components/AdminPage/AdminPage";

function App() {
  return (
        <PlanProvider className="App">
            <BrowserRouter>
                <Route path="/intervals" component={ Intervals } />
                <Route path="/days" component={ Days } />
                <Route path="/plans" component={ Plans } />
                <Route path='/timer' component={ Timer }/>
                <Route path='/finishedDay' component={ Finished } />
                <Route path='/editUser' component={ EditUser } />
                <Route path='/admin' component={ AdminPage } />
                <Route path='/' component={ Home } />
            </BrowserRouter>
        </PlanProvider>
  );
}

export default App;
