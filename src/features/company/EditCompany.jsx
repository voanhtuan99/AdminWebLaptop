import '../style.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addCompany, editCompany } from '../../app/slice/companySlice';
export default function EditCompany() {
    const [company_name, setCompanyName] = useState('')
    const [company_type, setCompanyType] = useState('Nhà phân phối')
    const [company_address, setCompanyAddress] = useState('')
    const [company_phone, setCompanyPhone] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    useEffect(() => {
        Aos.init({
        })
        axios({
            method: "GET",
            url: `http://localhost:8080/api/company/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setCompanyName(res.data.data.company_name)
                setCompanyType(res.data.data.company_type)
                setCompanyAddress(res.data.data.company_address)
                setCompanyPhone(res.data.data.company_phone)
            })
    }, [])
    const updateCompany = () => {
        console.log(company_name, company_type, company_address, company_phone);
        if (company_name !== '' && company_type !== '' && company_address !== '' && company_phone !== '') {
            axios({
                method: "PUT",
                url: `http://localhost:8080/api/company/${params.id}`,
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
                    const action = editCompany(res.data.data)
                    dispatch(action)
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
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
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
                            onChange={(e) => setCompanyAddress(e.target.value)}
                        />
                    </div>
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
                            onChange={(e) => setCompanyPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="group-button">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<SaveIcon />} onClick={updateCompany}>
                            Cập nhật
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