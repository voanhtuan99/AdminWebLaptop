import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Aos from 'aos';
import { CircularProgress } from '@mui/material';
import ItemDetailImport from './ItemDetailImport';
import AddDetailImport from './AddDetailImport';
import { useDispatch } from 'react-redux';
import { AddPNX } from '../../app/slice/phieunhapxuatSlice';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateImport() {
    const history = useHistory()
    const [companies, setCompanies] = useState([])
    const [company, setCompany] = useState()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [ShowAddDetail, setShowAddDetail] = useState(false)
    const [listDetail, setListDetail] = useState([])
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const dispatch = useDispatch()
    const onChangeSelect = (value) => {
        setCompany(value.value)
    }
    useEffect(() => {
        Aos.init({
        })
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/company/npp",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                setCompanies(res.data.data.map(item => {
                    return { value: item, label: item.company_name }
                }))
            })
            .then(res => {
                axios({
                    method: "GET",
                    url: "http://localhost:8080/api/product/"
                })
                    .then(res => {
                        setProducts(res.data.data.map(item => {
                            return {
                                value: item,
                                label: item.product_name
                            }
                        }))
                    })
                    .then(() => {
                        setLoading(false)
                    })
            })


    }, [])
    const onChangeProduct = (value) => {
        localStorage.setItem("itemProduct", value.value.id)
        setShowAddDetail(true)
    }
    const closeAddDetail = () => {
        setShowAddDetail(false)
    }
    const addDetail = (detail) => {
        const details = listDetail
        details.push(detail)
        console.log(details)
        setListDetail(details)
        setShowAddDetail(false)
    }
    const removeDetail = (detailId) => {
        const details = listDetail.filter(item => item.product.id !== detailId)
        setListDetail(details)
    }
    const createImport = () => {
        setIsLoadingBtn(true)
        axios({
            method: "POST",
            url: `http://localhost:8080/api/pnhapxuat/add`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            data: {
                iduser: localStorage.getItem('idUser'),
                idcompany: company.id
            }
        }).then(res => {
            listDetail.forEach(item => {
                axios({
                    method: "POST",
                    url: 'http://localhost:8080/api/ctpnhaps/add',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                    data: {
                        quantity: item.quantity,
                        price: item.price,
                        idimport: res.data.data.nhapId,
                        idproduct: item.product.id
                    }
                })
            })
            const action = AddPNX(res.data.data)
            dispatch(action)
        }).then(() => {
            toast.success('Tạo phiếu thành công', {
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
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            {ShowAddDetail ? <AddDetailImport closeAddDetail={closeAddDetail} addDetail={addDetail} /> : ''}
            <div className="form order accept-order" data-aos-duration="800" data-aos="zoom-up">
                <h1 className="big-label">Tạo phiếu nhập</h1>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <>
                        <div className="select-company" data-aos-duration="500" data-aos="zoom-up" style={{ zIndex: 15 }}>
                            <strong>Công ty: </strong>
                            <div className="form-select">
                                <Select options={companies} onChange={onChangeSelect} />
                            </div>
                        </div>
                        <span className="tencty">{company ? `Công ty: ${company.company_name}` : ''}</span>
                        <div className="select-company" data-aos-duration="500" data-aos="zoom-up" style={{ zIndex: 14 }}>
                            <strong>Công ty: </strong>
                            <div className="form-select">
                                <Select options={products} onChange={onChangeProduct} />
                            </div>
                        </div>
                        <div className="list-detail phieunx" data-aos-duration="500" data-aos="zoom-up">
                            <div className="name-column-detail-order phieunx">
                                <span className='image'>
                                    Image
                                </span>
                                <span className='name'>
                                    Tên sản phẩm
                                </span>
                                <span className='qty'>
                                    SL
                                </span>
                                <span className='price'>
                                    Giá
                                </span>
                                <span className='delete'>
                                    Xóa
                                </span>
                            </div>
                            {listDetail.length > 0 ? listDetail.map((item, index) => {
                                return <ItemDetailImport detail={item} key={index} removeDetail={removeDetail} />
                            }) : <div className="empty">
                                Chưa có sản phẩm
                            </div>}
                        </div>
                        <div className="order-group-btn">
                            <Button disabled={isLoadingBtn} variant="contained" color="info" startIcon={<LocalShippingIcon />} sx={{ marginRight: 2 }} onClick={createImport}>
                                Tạo phiếu nhập
                            </Button>

                            <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/nhapxuat')}>
                                Thoát
                            </Button>
                        </div></>}
            </div>
        </div>
    )
}