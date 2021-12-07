import '../style.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addCompany } from '../../app/slice/companySlice';
export default function AddCompany() {
    const [company_name, setCompanyName] = useState('')
    const [company_type, setCompanyType] = useState('Nhà phân phối')
    const [company_address, setCompanyAddress] = useState('')
    const [company_phone, setCompanyPhone] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    useEffect(() => {
        Aos.init({
        })
    }, [])
    const createCompany = () => {
        console.log(company_name, company_type, company_address, company_phone);
        if (company_name === '') {
            document.querySelector('.errorname p').innerHTML = 'Tên công ty không được để trống'
        }
        if (company_address === '') {
            document.querySelector('.erroraddress p').innerHTML = 'Địa chỉ không được để trống'
        }
        if (company_phone === '') {
            document.querySelector('.errorphone p').innerHTML = 'Số điện thoại không được để trống'
        }
        if (company_name !== '' && company_type !== '' && company_address !== '' && company_phone !== '') {
            setIsLoadingBtn(true)
            axios({
                method: "POST",
                url: "http://localhost:8080/api/company/add",
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    company_name,
                    company_type,
                    company_address,
                    company_phone
                }
            })
                .then((res) => {
                    toast.success(`Thêm công ty ${res.data.data.company_name} thành công`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    const action = addCompany(res.data.data)
                    dispatch(action)
                    setIsLoadingBtn(false)
                })
                .catch(() => {
                    toast.success(`Công ty đã tồn tại`, {
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
    }
    const handleChange = (e) => {
        setCompanyType(e.target.value)
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form add-company" data-aos="zoom-up" data-aos-duration="800">
                <h1 className="title add-cate">CREATE COMPANY</h1>
                <div className="content">
                    <div className="cate-name">
                        <p>Name</p>
                        <TextField
                            label="Tên công ty"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            value={company_name}
                            onChange={(e) => {
                                if (company_name !== '') {
                                    document.querySelector('.errorname p').innerHTML = ''
                                }
                                setCompanyName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 errorname" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="cate-name">
                        <p>Type</p>
                        <div className="select">
                            <FormControl sx={{ m: 1, minWidth: 405 }}>
                                <InputLabel id="demo-simple-select-helper-label">Hãng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={company_type}
                                    label="Hãng"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Nhà phân phối">Nhà phân phối</MenuItem>
                                    <MenuItem value="Vận chuyển">Vận chuyển</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="cate-name">
                        <p>Address</p>
                        <TextField
                            label="Địa chỉ"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            value={company_address}
                            onChange={(e) => {
                                if (company_address !== '') {
                                    document.querySelector('.erroraddress p').innerHTML = ''
                                }
                                setCompanyAddress(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 erroraddress" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="cate-name">
                        <p>Phone number</p>
                        <TextField
                            label="Số điện thoại"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            type="number"
                            value={company_phone}
                            onChange={(e) => {
                                if (company_phone !== '') {
                                    document.querySelector('.errorphone p').innerHTML = ''
                                }
                                setCompanyPhone(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 errorphone" style={{ marginLeft: 200 }}><p></p></div>
                </div>
                <div className="group-button">
                    <Stack direction="row" spacing={2}>
                        <Button disabled={isLoadingBtn} variant="contained" startIcon={<AddIcon />} onClick={createCompany}>
                            Thêm
                        </Button>
                        <Button variant="outlined" onClick={() => history.push('/admin/company')} endIcon={<ArrowBackIcon />}>
                            Thoát
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}