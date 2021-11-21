import "../style.scss"
export default function DetailOrderItem(props) {
    console.log(props.detail)
    return (
        <div className="detail-order">
            <img src={props.detail.image[0].imageLink} alt="" />
            <h4 className="name">{props.detail.name}</h4>
            <span className="qty">{props.detail.detailQty}</span>
            <span className="price">{props.detail.detailPrice}</span>
        </div>
    )
}