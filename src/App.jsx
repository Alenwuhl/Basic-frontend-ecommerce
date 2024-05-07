import { BrowserRouter, Routes, Route } from "react-router-dom"
import ItemDetailContainer from "./components/Productos/ItemDetailContainer"
import ItemListContainer from "./components/Productos/ItemListContainer"
import NavBar from "./components/NavBar/NavBar"
import Cart from "./components/Cart/Cart"
import ShoppingCartProvider, { CartContext } from "./context/ShoppingCartContext";
import RegisterForm from "./components/Forms/RegisterForm";
import LoginForm from "./components/Forms/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute"
import CurrentUser from "./components/Users/CurrentUser"
import Confirmation from "./components/Cart/confirmation"
import UsersControl from "./components/Users/UsersControl"

const App = () => {
  return (
    <div>
      <ShoppingCartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route exact path='/' element={<ItemListContainer />} />
            <Route path='/currentUser' element={<ProtectedRoute><CurrentUser /></ProtectedRoute>} />
            <Route exact path="/item/:id" element={<ItemDetailContainer />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path="/users-control" element={<UsersControl />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </div>
  )
}

export default App
