import { Switch, Route } from 'react-router-dom'
import AddBrand from './features/brand/AddBrand'
import DeleteBrand from './features/brand/DeleteBrand'
import EditBrand from './features/brand/EditBrand'
import AddCate from './features/category/AddCate'
import DeleteCate from './features/category/DeleteCate'
import EditCate from './features/category/EditCate'
import AddCompany from './features/company/AddCompany'
import DeleteCompany from './features/company/DeleteCompany'
import EditCompany from './features/company/EditCompany'
import AcceptOrder from './features/order/AcceptOrder'
import CancelOrder from './features/order/CancelOrder'
import CreateImport from './features/pnx/createImport'
import AddProduct from './features/product/addproduct'
import DeleteProduct from './features/product/deleteproduct'
import EditProduct from './features/product/EditProduct'
import ViewImport from './features/pnx/ViewImport'
import CancelImport from './features/pnx/CancelImport'
import InfoOrder from './features/order/InfoOrder'
import ReceivedOrder from './features/order/ReceivedOrder'
import AddUser from './features/user/AddUser'
import EditUser from './features/user/EditUser'
import BlockUser from './features/user/BlockUser'
export default function RouterFeature() {
    return (
        <Switch>
            <Route path="/admin/product/add">
                <AddProduct />
            </Route>
            <Route path="/admin/product/del/:id">
                <DeleteProduct />
            </Route>
            <Route path="/admin/product/edit/:id">
                <EditProduct />
            </Route>
            <Route path="/admin/category/add">
                <AddCate />
            </Route>
            <Route path="/admin/category/edit/:id">
                <EditCate />
            </Route>
            <Route path="/admin/category/del/:id">
                <DeleteCate />
            </Route>
            <Route path="/admin/brand/add">
                <AddBrand />
            </Route>
            <Route path="/admin/brand/del/:id">
                <DeleteBrand />
            </Route>
            <Route path="/admin/brand/edit/:id">
                <EditBrand />
            </Route>
            <Route path="/admin/company/add">
                <AddCompany />
            </Route>
            <Route path="/admin/company/del/:id">
                <DeleteCompany />
            </Route>
            <Route path="/admin/company/edit/:id">
                <EditCompany />
            </Route>
            <Route path="/admin/order/acceptorder/:id">
                <AcceptOrder />
            </Route>
            <Route path="/admin/order/cancel/:id">
                <CancelOrder />
            </Route>
            <Route path="/admin/order/receive/:id">
                <ReceivedOrder />
            </Route>
            <Route path="/admin/order/info/:id">
                <InfoOrder />
            </Route>
            <Route path="/admin/nhapxuat/add">
                <CreateImport />
            </Route>
            <Route path="/admin/nhapxuat/view/:id">
                <ViewImport />
            </Route>
            <Route path="/admin/nhapxuat/del/:id">
                <CancelImport />
            </Route>
            <Route path="/admin/users/add">
                <AddUser />
            </Route>
            <Route path="/admin/users/edit/:id">
                <EditUser />
            </Route>
            <Route path="/admin/users/block/:id">
                <BlockUser />
            </Route>
        </Switch>

    )
}