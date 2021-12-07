import '../style.scss'
import Select from 'react-select'
import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import DetailOrderItem from './DetailOrderItem';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { editOrder } from '../../app/slice/orderSlice';
export default function AcceptOrder() {
    const [order, setOrder] = useState({});
    const [detaiOrder, setDetailOrder] = useState([])
    const params = useParams()
    const history = useHistory()
    const [companies, setCompanies] = useState([])
    const [company, setCompany] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
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
                axios({
                    method: "GET",
                    url: `http://localhost:8080/api/detailorder/order/${params.id}`,
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                })
                    .then((res) => {
                        console.log(res.data.data)
                        setDetailOrder(res.data.data)
                    })
                    .then(() => {
                        axios({
                            method: "GET",
                            url: "http://localhost:8080/api/company/dvvc",
                            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
                        })
                            .then(res => {
                                setCompanies(res.data.data.map(item => {
                                    return { value: item, label: item.company_name }
                                }))
                            }).then(() => {
                                setLoading(false)
                            })
                    })
            })

    }, [])
    const onChangeSelect = (value) => {
        setCompany(value.value)
    }
    const acceptOrder = () => {
        console.log(company)
        if (Object.keys(company).length === 0) {
            toast.warning('Vui lòng chọn đơn vị vận chuyển', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        }
        else {
            setIsLoadingBtn(true)
            axios({
                method: "PUT",
                url: `http://localhost:8080/api/orders/accept/${params.id}`,
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            })
                .then(res => {
                    const action = editOrder(res.data.data)
                    dispatch(action)
                    axios({
                        method: "POST",
                        url: `http://localhost:8080/api/pnhapxuat/addpx`,
                        headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                        data: {
                            iduser: localStorage.getItem('idUser'),
                            idcompany: company.id
                        }
                    }).then(res => {
                        detaiOrder.forEach(item => {
                            axios({
                                method: "POST",
                                url: `http://localhost:8080/api/ctpnhaps/add`,
                                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                                data: {
                                    quantity: item.detailQty,
                                    price: item.detailPrice,
                                    idproduct: item.product_id,
                                    idimport: res.data.data.nhapId
                                }
                            })
                        })
                    }).then(() => {
                        toast.success('Đã xác nhận đơn hàng', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            style: {
                                background: "#fff",
                                color: "#00ff14"
                            }
                        });
                        setIsLoadingBtn(false)
                    })
                })
        }


    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form order accept-order" data-aos-duration="800" data-aos="zoom-up">
                <h1 className="big-label">Xác nhận đơn hàng</h1>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <>
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
                        <div className="select-company" data-aos-duration="500" data-aos="zoom-up" style={{ zIndex: 15 }}>
                            <strong>Công ty: </strong>
                            <div className="form-select">
                                <Select options={companies} onChange={onChangeSelect} />
                            </div>
                        </div>
                        <span className="tencty"></span>
                        <div className="list-detail order" data-aos-duration="500" data-aos="zoom-up">
                            <div className="name-column-detail-order">
                                <span className='image'>
                                    Image
                                </span>
                                <span className='name'>
                                    Tên sản phẩm
                                </span>
                                <span className='qty'>
                                    Số lượng
                                </span>
                                <span className='price'>
                                    Giá
                                </span>
                            </div>
                            {detaiOrder.map((item, index) => {
                                return <DetailOrderItem detail={item} key={index} />
                            })}

                        </div>
                        <div className="order-group-btn">
                            <Button disabled={isLoadingBtn} variant="contained" color="secondary" startIcon={<LocalShippingIcon />} sx={{ marginRight: 2 }} onClick={acceptOrder}>
                                xác nhận
                            </Button>
                            <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/order')}>
                                Thoát
                            </Button>
                        </div></>}
            </div>
        </div>
    )
}