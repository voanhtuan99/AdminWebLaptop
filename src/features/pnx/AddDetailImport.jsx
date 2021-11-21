import { CircularProgress, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style.scss'
export default function AddDetailImport(props) {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    useEffect(() => {
        setLoading(true)
        axios({
            methods: "GET",
            url: `http://localhost:8080/api/product/${localStorage.getItem('itemProduct')}`
        })
            .then(res => {
                setProduct(res.data.data)
                console.log(res.data.data.imageDTOS[0].imageLink)
            }).then(() => {
                setLoading(false)
            })
    }, [])
    const addDetail = () => {
        console.log('aaaaa')
        props.addDetail({
            quantity: qty,
            price: price,
            product: product
        })
        localStorage.removeItem('itemProduct')
    }
    return (

        <div className="overlays2">

            <div className="form-add-detail">
                <h3 className="title">Thêm sản phẩm</h3>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> : <>
                        <div className="product-name">
                            <strong>Tên sản phẩm</strong>
                            {product.product_name}
                        </div>
                        <div className="detail-image">
                            <img
                                src={product.imageDTOS ? product.imageDTOS[0].imageLink : ''}
                                alt="#" />
                        </div>
                        <div className="content-all">
                            <div className="content">
                                <strong>Số lượng</strong>
                                <TextField type="number" size="small" sx={{ width: 300 }} label="Số lượng" color="info" value={qty} onChange={(e) => setQty(e.target.value)} />
                            </div>
                            <div className="content">
                                <strong>Giá nhập</strong>
                                <TextField type="number" label="Giá nhập" size="small" sx={{ width: 300 }} color="info" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="group-btn">
                            <Button variant="contained" sx={{ width: 120, marginRight: 2 }} onClick={addDetail}>Thêm</Button>
                            <Button onClick={props.closeAddDetail} variant="outlined" sx={{ width: 120 }}>
                                Trở lại
                            </Button>
                        </div></>}
            </div>
        </div>
    )
}