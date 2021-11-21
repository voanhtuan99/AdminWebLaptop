import { Avatar } from "@mui/material"
import "./navbar.scss"
import LaptopIcon from '@mui/icons-material/Laptop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import { useHistory } from "react-router";
import { pink } from "@mui/material/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
export default function Navbar() {
    const history = useHistory()
    const clickItemActive = (id) => {
        const listid = ['info', 'dashboard', 'product', 'category', 'users', 'order', 'nhapxuat', 'brand', 'company']
        let listnew = []
        listid.forEach(item => {
            if (item !== id) {
                listnew.push(item)
            }
        })
        listnew.forEach(item => {
            document.querySelector(`#${item}`).classList.remove("active")
        })
        document.querySelector(`#${id}`).classList.add("active")
        document.querySelector('.navbarr').classList.toggle('active')
        history.push(`/admin/${id}`)

    }
    return (
        <div className="navbarr">
            <div className="nav__form">
                <div className="nav__title">
                    <Avatar
                        sx={{ width: 45, height: 45, bgcolor: pink[500] }}
                    >
                        <AccountCircleIcon fontSize="medium" />
                    </Avatar>
                    <p className="fullname">Võ Anh Tuấn</p>
                </div>
                <ul className="nav__list">
                    <li id="info" className="list__item active" onClick={() => clickItemActive("info")}><div><PersonIcon /></div> <span>Tài khoản cá nhân</span></li>
                    <li id="dashboard" className="list__item" onClick={() => clickItemActive("dashboard")}><div><DashboardIcon /></div> <span>Biểu đồ</span></li>
                    <li id="product" className="list__item" onClick={() => clickItemActive("product")}><div><LaptopIcon /></div><span>Sản phẩm</span></li>
                    <li id="category" className="list__item" onClick={() => clickItemActive("category")}><div><CategoryIcon /></div> <span>Loại sản phẩm</span></li>
                    <li id="brand" className="list__item" onClick={() => clickItemActive("brand")}><div><BusinessIcon /></div> <span>Hãng sản xuất</span></li>
                    <li id="company" className="list__item" onClick={() => clickItemActive("company")}><div><StoreIcon /></div> <span>Công ty</span></li>
                    <li id="users" className="list__item" onClick={() => clickItemActive("users")}><div><GroupIcon /></div> <span>List User</span></li>
                    <li id="order" className="list__item" onClick={() => clickItemActive("order")}><div><i className="fas fa-clipboard-list"></i></div><span>Đơn hàng</span></li>
                    <li id="nhapxuat" className="list__item" onClick={() => clickItemActive("nhapxuat")}><div><i className="fas fa-list-alt"></i></div><span>Nhập xuất</span></li>
                </ul>
            </div>
        </div >
    )
}