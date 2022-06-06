/* eslint-disable jsx-a11y/anchor-is-valid */
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router";
import Home from "./pages/Home";
import { HomeTemplate } from "./templates/HomeTemplate";
import "./App.css";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate";
import UserTemplate from "./templates/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile";
import AdminTemplate from "./templates/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard";
import Films from "./pages/Admin/Films";
import Showtime from "./pages/Admin/Films/Showtime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import AddNewUser from "./pages/Admin/Dashboard/AddNewUser/AddNewUser";
import EditUser from "./pages/Admin/Dashboard/EditUser/EditUser";
import Trailer from "./components/Trailer/Trailer";
// import { lazy, Suspense } from "react";

// const CheckoutTemplateLazy = lazy(() => import("./templates/CheckoutTemplate"));

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Trailer />
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        <HomeTemplate path="/detail/:id/:rating" exact Component={Detail} />

        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />

        <AdminTemplate path="/admin/users" exact Component={Dashboard} />
        <AdminTemplate
          path="/admin/users/addnew"
          exact
          Component={AddNewUser}
        />
        <AdminTemplate
          path="/admin/users/edit/:taikhoan/:usertype"
          exact
          Component={EditUser}
        />

        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate
          path="/admin/films/showtime/:id"
          exact
          Component={Showtime}
        />

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        {/* <Suspense fallback={<h1>Loading...</h1>}>
          <CheckoutTemplateLazy
            path="/checkout/:id"
            exact
            Component={Checkout}
          />
        </Suspense> */}
        <HomeTemplate path="/" Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
