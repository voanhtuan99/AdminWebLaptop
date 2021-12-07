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
            document.querySelector('.errorname p').innerHTML = 'Tên sản phẩm không được để trống'
        }
        if (product_price === '') {
            document.querySelector('.errorprice p').innerHTML = 'Giá không được để trống'
        }
        if (product_discount === '') {
            document.querySelector('.errordiscount p').innerHTML = 'Giá giảm không được để trống'
        }
        if (product_description === '') {
            document.querySelector('.errordesc p').innerHTML = 'Mô tả không được để trống'
        }
        if (product_quantity === '') {
            document.querySelector('.errorqty p').innerHTML = 'Số lượng không được để trống'
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
                toast.success(`Thêm sản phẩm thành công`, {
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
                    <h1 className="title addproduct__title">Update sản phẩm</h1>

                    <div className="contentall edit-product-content">
                        <div className="description">
                            <div className="content">
                                <p>Tên sản phẩm</p>
                                <TextField
                                    label="Tên sản phẩm"
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
                                <p>Số lượng</p>
                                <TextField
                                    label="Số lượng"
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
                                <p>Đơn giá</p>
                                <TextField
                                    label="Đơn giá"
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
                                <p>Khuyến mãi</p>
                                <TextField
                                    label="Đơn giá"
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
                                <p>Loại SP</p>
                                <FormControl sx={{ m: 1, minWidth: 405, height: 40 }} className="select-type">
                                    <InputLabel id="demo-simple-select-helper-label">Loại sản phẩm</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={cate}
                                        label="Loại sản phẩm"
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
                                <p>Hãng</p>
                                <FormControl sx={{ m: 1, minWidth: 405 }} className="select-type">
                                    <InputLabel id="demo-simple-select-helper-label">Hãng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={brand}
                                        label="Hãng"
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
                                <p>Mô tả</p>
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
                        }}>Quay lại</button>
                    </div>
                </div>
            }
        </div>
    )
}