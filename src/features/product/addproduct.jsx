import { useHistory } from 'react-router'
import './style.scss'
import Aos from 'aos'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddProduct() {
    const [images, setImages] = useState([])
    const [image1, setImage1] = useState('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    const [image2, setImage2] = useState('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    const [image3, setImage3] = useState('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    const [image4, setImage4] = useState('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    const [product_name, setProduct_name] = useState('')
    const [product_price, setProduct_price] = useState(0)
    const [product_discount, setproduct_discount] = useState(0)
    const [listCate, setListCate] = useState([])
    const [listBrand, setListBrand] = useState([])
    const [cate, setCate] = useState('')
    const [brand, setBrand] = useState('')
    const [product_description, setproduct_description] = useState('')
    const onChange1 = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'apiuploadimage')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/tuanvo/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImages(oldArray => [...oldArray, file.secure_url])
        setImage1(file.secure_url)
        console.log(file.secure_url)
    }
    const onChange2 = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'apiuploadimage')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/tuanvo/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImages(oldArray => [...oldArray, file.secure_url])
        setImage2(file.secure_url)
    }
    const onChange3 = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'apiuploadimage')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/tuanvo/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImages(oldArray => [...oldArray, file.secure_url])
        setImage3(file.secure_url)
    }
    const onChange4 = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'apiuploadimage')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/tuanvo/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImages(oldArray => [...oldArray, file.secure_url])
        setImage4(file.secure_url)
    }
    const deleteImage1 = async () => {
        setImages(images.filter(item => item !== image1))
        setImage1('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')

    }
    const deleteImage2 = async () => {
        setImages(images.filter(item => item !== image2))
        setImage2('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    }
    const deleteImage3 = async () => {
        setImages(images.filter(item => item !== image3))
        setImage3('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    }
    const deleteImage4 = async () => {
        setImages(images.filter(item => item !== image4))
        setImage4('https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg')
    }
    useEffect(() => {
        Aos.init({
        })
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
    }, [])
    const handleChangeName = (e) => {
        setProduct_name(e.target.value)
    }
    const handleChangePrice = (e) => {
        setProduct_price(e.target.value)
    }
    const handleChangeDiscount = (e) => {
        setproduct_discount(e.target.value)
    }
    const handleChangeCate = (e) => {
        setCate(e.target.value)
    }
    const handleChangeBrand = (e) => {
        setBrand(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setproduct_description(e.target.value)
    }
    const addNewProduct = () => {

        let imgDTOS = images.map(item => {
            return {
                imageLink: item
            }
        })
        if (product_name !== '' && product_price !== 0 && product_discount !== '' && product_description !== '') {
            axios({
                method: "POST",
                url: "http://localhost:8080/api/product/add",
                data: {
                    product_name,
                    product_discount,
                    product_price,
                    product_description,
                    brand_id: brand,
                    category_id: cate,
                    imageDTOS: imgDTOS
                },
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }

            })
                // .then(res => {
                //     images.forEach(item => {
                //         axios({
                //             method: "POST",
                //             url: "http://localhost:8080/api/images/image",
                //             data: {
                //                 imageLink: item,
                //                 product_id: res.data.data.id
                //             },
                //             headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                //         })
                //     })

                // })
                .then(() => {
                    toast.success('🦄 Wow so easy!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }
    const history = useHistory()
    console.log(images)
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form addproduct" data-aos="zoom-up" data-aos-duration="800">
                <h1 className="title addproduct__title">Thêm sản phẩm mới</h1>
                <div className="contentall addproduct__content">
                    <div className="description">
                        <div className="content">
                            <p>Tên sản phẩm</p>
                            <input type="text" placeholder="Nhập tên sản phẩm" onChange={handleChangeName} value={product_name} />
                        </div>
                        <div className="error"></div>
                        <div className="content">
                            <p>Giá</p>
                            <input type="number" placeholder="Nhập tên sản phẩm" onChange={handleChangePrice} value={product_price} />
                        </div>
                        <div className="error"></div>

                        <div className="content">
                            <p>Khuyến mãi</p>
                            <input type="number" placeholder="Nhập tên sản phẩm" onChange={handleChangeDiscount} value={product_discount} />
                        </div>
                        <div className="error"></div>
                        <div className="content">
                            <p>Loại sản phẩm</p>
                            <select name="category" id="category" onChange={handleChangeCate} value={cate}>
                                {listCate.map((item, index) => {
                                    return <option value={item.id}>{item.category_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="error"></div>
                        <div className="content">
                            <p>Hãng</p>
                            <select name="category" id="category" onChange={handleChangeBrand} value={brand}>
                                {listBrand.map((item, index) => {
                                    return <option value={item.id}>{item.brand_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="error"></div>
                        <div className="content">
                            <p>Mô tả</p>
                            <textarea type="text" placeholder="Mô tả" onChange={handleChangeDescription} value={product_description} />
                        </div>
                        <div className="error"></div>

                    </div>
                    <div className="group-image">
                        <div className="image-form">

                            <img src={image1} alt="" />
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange1}
                                disabled={image1 !== 'https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg' ? true : false}
                            />
                            <span className="delete-img" onClick={deleteImage1}>X</span>
                        </div>
                        <div className="image-form">

                            <img src={image2} alt="" />
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange2}
                                disabled={image2 !== 'https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg' ? true : false}
                            />
                            <span className="delete-img" onClick={deleteImage2}>X</span>
                        </div>
                        <div className="image-form">

                            <img src={image3} alt="" />
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange3}
                                disabled={image3 !== 'https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg' ? true : false}
                            />
                            <span className="delete-img" onClick={deleteImage3}>X</span>
                        </div>
                        <div className="image-form">

                            <img src={image4} alt="" />
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange4}
                                disabled={image4 !== 'https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg' ? true : false}
                            />
                            <span className="delete-img" onClick={deleteImage4}>X</span>
                        </div>
                    </div>

                </div>
                <div className="groupbtn addproduct">
                    <button onClick={addNewProduct}>Thêm</button>
                    <button onClick={() => {
                        history.goBack()
                    }}>Quay lại</button>
                </div>
            </div>
        </div>
    )
}