import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; 
import AuthPage from './pages/auth'
import NewOrderPage from './pages/new_order'
import OrderHistoryPage from './pages/order_history'
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';


function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      { user ? 
      <div>
        <Nav />
        <Routes>
           <Route path="/orders" element={<OrderHistoryPage />}/>
           <Route path="/orders/new" element={<NewOrderPage />}/>
           {/* <Route path="/*" element={<Navigate to="/orders/new" />} /> */}
        </Routes>
      </div>
        :
        <AuthPage />
      }
    </div>
  );
};

export default App;
