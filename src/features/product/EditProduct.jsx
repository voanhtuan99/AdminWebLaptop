import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Aos from 'aos'
import { useEffect } from 'react'
import './style.scss'
import './error.scss'
import { useHistory, useParams } from 'react-router'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { updateProduct } from '../../app/slice/productSlice';
export default function EditProduct() {
    const [product_name, setProduct_name] = useState('')
    const [product_price, setProduct_price] = useState(0)
    const [product_discount, setProduct_discount] = useState(0)
    const [product_quantity, setProduct_quantity] = useState(0)
    const [listCate, setListCate] = useState([])
    const [listBrand, setListBrand] = useState([])
    const [cate, setCate] = useState('')
    const [brand, setBrand] = useState('')
    const [product_description, setProduct_description] = useState('')
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [isLoadingEdit, setIsLoadingEdit] = useState(false)
    useEffect(() => {
        Aos.init({
        })
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/product/${params.id}`
        })
            .then(res => {
                setProduct_name(res.data.data.product_name)
                setProduct_price(res.data.data.product_price)
                setProduct_discount(res.data.data.product_discount)
                setCate(res.data.data.category_id)
                setBrand(res.data.data.brand_id)
                setProduct_description(res.data.data.product_description)
                setProduct_quantity(res.data.data.product_qty)
            }).then(() => {
                axios({
                    method: "GET",
                    url: "http://localhost:8080/api/category/",
                }).then(res => {
                    setListCate(res.data.data)
                })
                axios({
                    method: "GET",
                    url: "http://localhost:8080/api/brand"
                }).then(res => {
                    setListBrand(res.data.data)
                })
            })
            .then(() => {
                setLoading(false)
            })

    }, [])
    const editProduct = () => {
        if (product_name === '') {
            document.querySelector('.errorname p').innerHTML = 'T??n s???n ph???m kh??ng ???????c ????? tr???ng'
        }
        if (product_price === '') {
            document.querySelector('.errorprice p').innerHTML = 'Gi?? kh??ng ???????c ????? tr???ng'
        }
        if (product_discount === '') {
            document.querySelector('.errordiscount p').innerHTML = 'Gi?? gi???m kh??ng ???????c ????? tr???ng'
        }
        if (product_description === '') {
            document.querySelector('.errordesc p').innerHTML = 'M?? t??? kh??ng ???????c ????? tr???ng'
        }
        if (product_quantity === '') {
            document.querySelector('.errorqty p').innerHTML = 'S??? l?????ng kh??ng ???????c ????? tr???ng'
        }
        if (product_name !== '' && product_price !== 0 && product_discount !== '' && product_description !== '' && product_quantity !== '') {
            setIsLoadingEdit(true)
            axios({
                method: "PUT",
                url: `http://localhost:8080/api/product/put/${params.id}`,
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    product_name,
                    product_price,
                    product_qty: product_quantity,
                    product_discount,
                    product_description,
                    category_id: cate,
                    brand_id: brand
                }
            }).then((res) => {
                const action = updateProduct(res.data.data)
                dispatch(action)
                toast.success(`Th??m s???n ph???m th??nh c??ng`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoadingEdit(false)
            })
        }
    }
    const history = useHistory()
    return (
        <div className="overlays1">
            <ToastContainer />

            {loading ?
                <div className="loading-page">
                    <CircularProgress sx={{ color: "white" }} />
                </div> :
                <div className="form edit-product">
                    {isLoadingEdit === true ? <div className="overlays3"><CircularProgress sx={{ color: "blue" }} /></div> : <></>}
                    <h1 className="title addproduct__title">Update s???n ph???m</h1>

                    <div className="contentall edit-product-content">
                        <div className="description">
                            <div className="content">
                                <p>T??n s???n ph???m</p>
                                <TextField
                                    label="T??n s???n ph???m"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    value={product_name}
                                    onChange={(e) => {
                                        if (product_name !== '') {
                                            document.querySelector('.errorname p').innerHTML = ''
                                        }
                                        setProduct_name(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 errorname"><p></p></div>
                            <div className="content">
                                <p>S??? l?????ng</p>
                                <TextField
                                    label="S??? l?????ng"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    type="number"
                                    value={product_quantity}
                                    onChange={(e) => {
                                        if (product_quantity !== '') {
                                            document.querySelector('.errorqty p').innerHTML = ''
                                        }
                                        setProduct_quantity(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 errorqty"><p></p></div>
                            <div className="content">
                                <p>????n gi??</p>
                                <TextField
                                    label="????n gi??"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    type="number"
                                    value={product_price}
                                    onChange={(e) => {
                                        if (product_price !== '') {
                                            document.querySelector('.errorprice p').innerHTML = ''
                                        }
                                        setProduct_price(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 errorprice"><p></p></div>
                            <div className="content">
                                <p>Khuy???n m??i</p>
                                <TextField
                                    label="????n gi??"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    type="number"
                                    value={product_discount}
                                    onChange={(e) => {
                                        if (product_discount !== '') {
                                            document.querySelector('.errordiscount p').innerHTML = ''
                                        }
                                        setProduct_discount(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 errordiscount"><p></p></div>
                            <div className="content">
                                <p>Lo???i SP</p>
                                <FormControl sx={{ m: 1, minWidth: 405, height: 40 }} className="select-type">
                                    <InputLabel id="demo-simple-select-helper-label">Lo???i s???n ph???m</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={cate}
                                        label="Lo???i s???n ph???m"
                                        onChange={(e) => setCate(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {listCate.map(item => {
                                            return <MenuItem value={item.id}>{item.category_name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="content">
                                <p>H??ng</p>
                                <FormControl sx={{ m: 1, minWidth: 405 }} className="select-type">
                                    <InputLabel id="demo-simple-select-helper-label">H??ng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={brand}
                                        label="H??ng"
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {listBrand.map(item => {
                                            return <MenuItem value={item.id}>{item.brand_name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="content">
                                <p>M?? t???</p>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Multiline"
                                    multiline
                                    rows={3}
                                    sx={{ width: '58ch' }}
                                    value={product_description}
                                    onChange={(e) => {
                                        setProduct_description(e.target.value)
                                        if (product_description !== '') {
                                            document.querySelector('.errordesc p').innerHTML = ''
                                        }
                                    }}
                                />
                            </div>
                            <div className="error1 errordesc"><p></p></div>
                        </div>
                    </div>
                    <div className="groupbtn addproduct">
                        <button onClick={editProduct}>Update</button>
                        <button onClick={() => {
                            history.goBack()
                        }}>Quay l???i</button>
                    </div>
                </div>
            }
        </div>
    )
}