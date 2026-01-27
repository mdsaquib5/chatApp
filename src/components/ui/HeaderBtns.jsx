import { Link } from "react-router-dom";

const HeaderBtns = () => {
    return (
        <div className="userBtns">
            <Link to={'/'} className="cakeBtn loginBtn">Login</Link>
            <Link to={'/'} className="cakeBtn salesBtn">Talk to sales</Link>
            <Link to={'/'} className="cakeBtn freeBtn">Get started free</Link>
        </div>
    )
}

export default HeaderBtns;