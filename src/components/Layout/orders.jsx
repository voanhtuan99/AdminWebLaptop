import './style.scss'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import Aos from 'aos'
import { getAllOrder } from '../../app/slice/orderSlice'
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function Orders() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    useEffect(() => {
        Aos.init({})
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/orders/",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                console.log(res.data.data)
                const action = getAllOrder(res.data.data)
                dispatch(action);
            }).then(() => {
                setLoading(false)
            })
    }, [])
    const listOrder = useSelector(state => state.order)
    const orders = () => {
        const data = {
            columns: [
                {
                    label: 'Ngày đặt',
                    field: 'ngaydat',
                    sort: 'asc'
                },
                {
                    label: 'Total Price',
                    field: 'total_price',
                    sort: 'asc'
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Phone Number',
                    field: 'phone_number',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }
        const handleShowBtns = (item) => {
            document.getElementById(`grp${item}`).classList.toggle('active')
            listOrder.forEach(e => {
                if (e.id !== item) {
                    document.getElementById(`grp${e.id}`).classList.remove('active')
                }
            })
        }
        listOrder && listOrder.forEach(item => {
            data.rows.push({
                ngaydat: item.ngaydat,
                total_price: item.total_price,
                address: item.address,
                phone_number: item.phone_number,
                status: <div className="order-status">
                    {item.status === 'Chờ xác nhận' ? <strong style={{ padding: 2, background: 'green', color: 'white', width: 100 }}>{item.status}</strong> : (item.status === 'Đã hủy' ? <strong style={{ padding: 2, background: '#333', color: 'white', width: 100 }}>{item.status}</strong> : (item.status === 'Đã nhận' ? <strong style={{ padding: 2, background: 'orange', color: 'white', width: 100 }} >{item.status}</strong> : <strong style={{ padding: 2, background: 'blue', color: 'white', width: 100 }} >{item.status}</strong>))}
                </div>,
                actions: <div className="menubtn">
                    <MoreVertIcon
                        onClick={() => handleShowBtns(item.id)}
                    />
                    <div className="togglebtn" id={`grp${item.id}`}>
                        <button className="btn0" onClick={() => {
                            history.push(`/admin/order/info/${item.id}`)
                            document.getElementById(`grp${item.id}`).classList.remove('active')
                        }}>Xem đơn</button>
                        {item.status === 'Chờ xác nhận' ? <button className="btn1" onClick={() => {
                            history.push(`/admin/order/acceptorder/${item.id}`)
                            document.getElementById(`grp${item.id}`).classList.remove('active')
                        }}>Xác nhận</button> : ''}
                        {item.status === 'Chờ xác nhận' || item.status === 'Đang giao' ? <button className="btn2" onClick={() => {
                            history.push(`/admin/order/cancel/${item.id}`)
                            document.getElementById(`grp${item.id}`).classList.remove('active')
                        }}>Hủy đơn</button> : ''}
                        {item.status === 'Đang giao' ? <button className="btn3" onClick={() => {
                            history.push(`/admin/order/receive/${item.id}`)
                            document.getElementById(`grp${item.id}`).classList.remove('active')
                        }}>Đã nhận</button> : ''}
                    </div>
                </div>
            })
        })
        return data;

    }
    return (
        <div className="display">
            <h1 className="title">
                ORDERS
            </h1>
            <div className="products">
                <div className="list">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={orders()}
                            className="px-3"
                            hover
                            searchTop
                            searchBottom={false}
                        />
                    }
                </div>
            </div>

        </div>
    )
}