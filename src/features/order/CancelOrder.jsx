import Aos from 'aos'
import { useEffect, useState } from 'react'
import '../style.scss'
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { editOrder } from '../../app/slice/orderSlice';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
export default function CancelOrder() {
    const params = useParams()
    const history = useHistory()
    const [order, setOrder] = useState({});
    const dispatch = useDispatch()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({
        })
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/orders/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setOrder(res.data.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const handleCancel = () => {
        setIsLoadingBtn(true)
        axios({
            method: "PUT",
            url: `http://localhost:8080/api/orders/cancel/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then((res) => {
                const action = editOrder(res.data.data)
                dispatch(action)
                toast.success(`Đã hủy đơn hàng`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoadingBtn(false)
            })
    }
    return (
        <div className="overlays1">
            <ToastContainer />

            <div className="form order cancel-order" data-aos-duration="800" data-aos="zoom-up">
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <>
                        <h1 className="big-label">Hủy đơn hàng</h1>
                        <div className="info-order" data-aos-duration="500" data-aos="zoom-up">
                            <div className="content-order">
                                <strong>Số điện thoại: </strong>
                                {order.phone_number}
                            </div>
                            <div className="content-order">
                                <strong>Địa chỉ:</strong>
                                {order.address}
                            </div>
                            <div className="content-order">
                                <strong>Tổng tiền: </strong>
                                {order.total_price}
                            </div>
                            <div className="content-order">
                                <strong>Ngày đặt: </strong>
                                {order.ngaydat}
                            </div>
                        </div>
                        <div className="order-group-btn">
                            <Button disabled={isLoadingBtn} variant="contained" color="error" startIcon={<CancelIcon />} sx={{ marginRight: 2 }} onClick={handleCancel}>
                                Hủy đơn
                            </Button>
                            <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/order')}>
                                Thoát
                            </Button>
                        </div>
                    </>}
            </div>
        </div >
    )
}