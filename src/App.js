
import './App.css';
// import MenuAdmin from './Components/Admin/MenuAdmin';
import Product from './Components/Admin/Product/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Menu from'./Components/User/Menu'
import SignUp from './Components/User/SignUp'
import SignIn from './Components/User/SignIn'
import Category from './Components/User/Categoty';
// import Account from './Components/Admin/Acount/ListSeller';
import Seller from './Components/User/Page/Seller'
import Profile from './Components/User/Page/Profile';
import MenuApp from './Components/Admin/MenuApp';
import ProductDetail from './Components/User/ProductDetail';
import RouteMenu from './Components/User/SignIn/RouteMenu';
import ListCart from './Components/User/Cart'
import {MeBe, SacDep, SucKhoe, TheThao, ThoiTrangNam, ThoiTrangNu} from './Components/User/FilterProduct/FilterProduct';
import HelpCenter from './Components/User/Page/HelpCenter';
import AccountSeller from './Components/Admin/ListAccount'
function App() {
  return (
    <div className="App" style={{ backgroundColor: "#F0F0F0" }}>
      <Router>
        <MenuApp />
        <Route exact path="/" component={Category} />
        <Route exact path="/cart" component={ListCart} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/myprofile" component={Profile} />
        <Route path="/help" component={HelpCenter} />
        <Route path="/account" component={AccountSeller} />
        <Route exact path="/seller" component={Seller} />
        <Route path="/product-suckhoe" component={SucKhoe} />
        <Route path="/product-thethao" component= {TheThao} />
        <Route path="/product-sacdep" component={SacDep} />
        <Route path="/product-ttnam" component={ThoiTrangNam} />
        <Route path="/product-ttnu" component={ThoiTrangNu} />
        <Route path="/product-mebe" component={MeBe} />
        {/* <Route exact path="/detail" component={ProductDetail} /> */}
        <Route exact path="/navigate" component={RouteMenu} />
        <Switch>
        <Route path="/product/:productId">
          <ProductDetail />
        </Route>
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
