import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useContext } from 'react'; 
import AuthPage from './pages/auth'
import NewOrderPage from './pages/new_order'
import OrderHistoryPage from './pages/order_history'
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';
import { getUserFromSession } from './utilities/user-functions';
import { AppContext } from './contexts/app_context';
import Loader from "react-js-loader";
import axios from 'axios';

function App() {

  const [callWasMade, setCallWasMade] = useState(false);

  let { user, setUser, setItems, setCart } = useContext(AppContext);

  // this will only run when we first open our app, or refresh the page

  // get user
  useEffect(() => {
    const getSession =  async () => {

      let userResponse = await getUserFromSession();
      setUser(userResponse)
      setCallWasMade(true)
    }
      getSession();

  }, []);


  // get items and set in context
  useEffect(() => {
    const getItems = async () => {
      let response = await axios('/get_items')
      console.log(response);
      let items = response.data;
      setItems(items)
    }
    getItems()
  }, [])



  // get cart

  useEffect(() => {
    const getCart = async () => {
      if (user) {
        // make call to database to get order
        let response = await axios({
            method: "GET",
            url: "/get_cart"
          })
          console.log(response);
          setCart(response.data)
      }
    }
    getCart()
  }, [user])

  const returnPage = () => {
    if (callWasMade) {
      return (
        <>
          { user ? 
            <div className="page-wrapper">
              <Nav />
              <Routes>
                <Route path="/orders" element={<OrderHistoryPage />}/>
                <Route path="/orders/new" element={<NewOrderPage />}/>
                <Route path="/*" element={<Navigate to="/orders/new" />} />
              </Routes>
            </div>
              :
              <AuthPage />
          }
        </>
      )
    } else {
      return <div>
        <Loader />
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
