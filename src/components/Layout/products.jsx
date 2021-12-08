import './style.scss'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { getAllProduct } from '../../app/slice/productSlice'
import { MDBDataTableV5 } from 'mdbreact'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import CircularProgress from '@mui/material/CircularProgress';
export default function ProductPage() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({

        })
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/product"
        }).then(res => {
            const action = getAllProduct(res.data.data)
            dispatch(action)
        }).then(() => {
            setLoading(false)
        })
    }, [])
    const listProduct = useSelector(state => state.product)
    const products = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Product Name',
                    field: 'product_name',
                    sort: 'asc'
                },
                {
                    label: 'Quanity',
                    field: 'product_qty',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'product_price',
                    sort: 'asc'
                },
                {
                    label: 'Discount',
                    field: 'product_discount',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        listProduct && listProduct.forEach(item => {
            data.rows.push({
                id: item.id,
                product_name: item.product_name,
                product_price: <strong>{new Intl.NumberFormat().format(item.product_price)}đ</strong>,
                product_qty: item.product_qty,
                product_discount: item.product_discount,
                actions: <div className="handle-product" >
                    <Link to={`/admin/product/edit/${item.id}`} className="icon icon-edit">
                        <i className="fas fa-pen"></i>
                    </Link>
                    <Link to={`/admin/product/del/${item.id}`} href className="icon icon-delete">
                        <i className="fas fa-trash-alt"></i>
                    </Link>
                </div>
            })
        })

        return data;

    }
    return (
        <div className="display">
            <h1 className="title">
                Danh sách sản phẩm
            </h1>
            <div className="products">
                <div className="products__controls">
                    <div className="search">

                    </div>
                    <Link to="/admin/product/add"><button className="addproduct"><i className="fas fa-plus"></i>Thêm sản phẩm</button></Link>
                </div>
                <div className="list">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={products()}
                            className="px-3"
                            hover
                            searchTop
                            searchBottom={false}
                        />}
                </div>
            </div>

        </div>
    )
}