import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'; 
import AuthPage from './pages/auth'
import NewOrderPage from './pages/new_order'
import OrderHistoryPage from './pages/order_history'
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';
import { getUserFromSession } from './utilities/user-functions';

function App() {

  const [user, setUser] = useState(null);
  const [callWasMade, setCallWasMade] = useState(false);


  // this will only run when we first open our app, or refresh the page
  useEffect(() => {
    const getSession =  async () => {

      let user = await getUserFromSession();
      setUser(user)
      setCallMade(true)
    }
    setTimeout(() => {
      getSession();
    }, 2000)
  }, []);

  const returnPage = () => {
    if (callWasMade) {
      return (
        <>
          { user ? 
            <div>
              <Nav />
              <Routes>
                <Route path="/orders" element={<OrderHistoryPage />}/>
                <Route path="/orders/new" element={<NewOrderPage />}/>
                <Route path="/*" element={<Navigate to="/orders/new" />} />
              </Routes>
            </div>
              :
              <AuthPage setUser={setUser}/>
          }
        </>
      )
    } else {
      return <div>
        loading....
      </div>
    }
  }

  return (
    <div className="App">
      { returnPage() }
    </div>
  );
};

export default App;
