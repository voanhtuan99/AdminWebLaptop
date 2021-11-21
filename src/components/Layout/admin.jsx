import Header from "../Common/Header";
import Navbar from "../Common/Navbar";
import RouterAdmin from "../../routeradmin"
import RouterFeature from "../../routerfeature"

export default function Admin() {
    return (
        <div>
            <Header />
            <Navbar />
            <RouterAdmin />
            <RouterFeature />
        </div>
    )
}