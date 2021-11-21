import { useState } from "react"
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
export default function InputFileImage(props) {
    const [image,setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'apiuploadimage')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/tuanvo/image/upload',
            {
                method:"POST",
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        console.log(file)
        props.handleChooseImage(file.secure_url, props.index)
        setLoading(false)
    }
    console.log(image)
    return (
        <div className="image">
            {loading ? <div className="spin-loading-image">
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="inherit" />
            </Stack>
            </div> : 
            <img src={image!=="" ? image : "https://th.bing.com/th/id/R.7cd93c73966ebc7690a1a92fb4d2d95f?rik=gyzj4%2bxW8J%2fqeQ&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-camera-logo%2ftransparent-camera-logo-17.png&ehk=VD1%2bb38S0%2bLjAnXuYHZ3NTzUyiTlsLOrHypdl9nbyCQ%3d&risl=&pid=ImgRaw&r=0"} alt="#" />}
            <input type="file" placeholder="Chọn ảnh" name="file" onChange={uploadImage}/>
        </div>
    )
}