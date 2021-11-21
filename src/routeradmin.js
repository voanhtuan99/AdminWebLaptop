
import { Route, Switch } from "react-router";
import Brand from "./components/Layout/brand";
import Categories from "./components/Layout/categories";
import Companies from "./components/Layout/companies";
import Dashboard from "./components/Layout/dashboard";
import InfoAdmin from "./components/Layout/info";
import Orders from "./components/Layout/orders";
import PhieuNhapXuat from "./components/Layout/phieunx";
import ProductPage from "./components/Layout/products";
import Users from "./components/Layout/Users";

export default function RouterAdmin() {
    return (
        <Switch>
            <Route exact path="/admin">
                <InfoAdmin />
            </Route>
            <Route path="/admin/info">
                <InfoAdmin />
            </Route>
            <Route path="/admin/dashboard">
                <Dashboard />
            </Route>
            <Route path="/admin/product">
                <ProductPage />
            </Route>
            <Route path="/admin/category">
                <Categories />
            </Route>
            <Route path="/admin/users">
                <Users />
            </Route>
            <Route path="/admin/order">
                <Orders />
            </Route>
            <Route path="/admin/nhapxuat">
                <PhieuNhapXuat />
            </Route>
            <Route path="/admin/brand">
                <Brand />
            </Route>
            <Route path="/admin/company">
                <Companies />
            </Route>
        </Switch>
    )
}