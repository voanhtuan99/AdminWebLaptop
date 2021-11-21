import DeleteIcon from '@mui/icons-material/Delete';
export default function ItemDetailImport(props) {
    const removeDetail = () => {
        props.removeDetail(props.detail.product.id)
    }
    return (
        <div className="detail-order phieunx">
            <img src={props.detail.product.imageDTOS[0].imageLink} alt="" />
            <h4 className="name">{props.detail.product.product_name}</h4>
            <span className="qty">{props.detail.quantity}</span>
            <span className="price">{props.detail.price}</span>
            <span className="delete">
                <DeleteIcon onClick={removeDetail} />
            </span>
        </div>
    )
}