import { Link } from "react-router-dom";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiDrippingStar } from "react-icons/gi";
import { MdOutlineThumbUpAlt } from "react-icons/md";

const Hero = () => {
    return (
        <>
            <div className="heroBg">
                <div className="container">
                    <div className="heroContainer">
                        <div className="heroContent">
                            <div className="heroHeading">The intuitive equity platform for fast-Growing startups.</div>
                            <p>Automate your equity and keep your team aligned with the all-in-one platform for cap tables, ESOPs and fundraising.</p>
                            <div className="heroPoints">
                                <div><FaHandHoldingUsd /> <span>Offer equality in minutes</span></div>
                                <div><GiDrippingStar /> <span>Keep cap table clean</span></div>
                                <div><MdOutlineThumbUpAlt /> <span>Motivate your team</span></div>
                            </div>
                            <div>
                                <Link to={'/'} className="heroBtn">Get started free</Link>
                            </div>
                        </div>
                        <div className="heroImage">
                            <img src="../assets/images/hero-image.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;