import Aos from "aos"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import './style.scss'
import axios from 'axios'
export default function DeleteProduct() {
    const history = useHistory()
    const [product, setProduct] = useState({})
    const params = useParams()
    useEffect(() => {
        Aos.init({})
        axios({
            method: "GET",
            url: `http://localhost:8080/api/product/${params.id}`
        }).then(res => {
            setProduct(res.data.data)
        })
    }, [])
    const handleDelete = () => {
        axios({
            method: "DELETE",
            url: `http://localhost:8080/api/product/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },

        }).then(() => {
            alert("thanh cong")
        })
    }
    return (
        <div className="overlays1" >
            <div className="form deleteproduct" data-aos="fade-up">

                <div className="delproduct__title">
                    <h2>Xóa sản phẩm

                    </h2>
                    <strong>{product.product_name}</strong>
                    <div className="logo"><i className="far fa-trash-alt"></i></div>
                </div>

                {/* <img src={product.imageDTOS[0] ? product.imageDTOS[0] : "https://th.bing.com/th/id/R.5b0c9085be79ce3023fa5b4ac62326f4?rik=KzA7Y%2f3U9NFWrA&pid=ImgRaw&r=0"} alt="#" className="contentall delproduct" /> */}
                <div className="groupbtn delproduct">
                    <button onClick={handleDelete}>Xóa sản phẩm</button>
                    <button onClick={() => {
                        history.push('/admin/product')
                    }}>Quay lại</button>
                </div>
            </div>
        </div>
    )
}