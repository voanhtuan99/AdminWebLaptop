export default function DetailView(props) {
    console.log(props.detail)
    return (
        <div className="detail-order">
            <img src={props.detail.imageDTOS[0].imageLink} alt="" />
            <h4 className="name">{props.detail.productName}</h4>
            <span className="qty">{props.detail.qtyNhap}</span>
            <span className="price">{props.detail.priceNhap}</span>
        </div>
    )
}