import React from 'react';
import Dashboard from './Screens/CustomerDashboard/Dashboard';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import AddCustomer from './Screens/CustomerDashboard/AddCustomer';
import Login from './Screens/LoginScreen/Login';
import CreateAccount from './Screens/LoginScreen/CreateAccount';

 function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/customerdashboard" element={<Dashboard/>}></Route>
    <Route path="/create/:id" element={<AddCustomer/>}></Route>
    <Route path="/edit/:id" element={<AddCustomer/>}></Route>
    <Route path="/createUser" element={<CreateAccount/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;