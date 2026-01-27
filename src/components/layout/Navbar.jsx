import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import HeaderBtns from "../ui/HeaderBtns";
import Nav from "../ui/Nav";

const Navbar = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header>
                <div className="container">
                    <div className="headerContainer">
                        <div className="logoMenu">
                            <div className="logo">
                                <Link to={'/'}>
                                    <img src="/assets/images/cake-logo.png" alt="Cake Logo" />
                                </Link>
                            </div>
                            <div className="menu">
                                {
                                    isDesktop ? <Nav /> : null
                                }
                            </div>
                        </div>
                        {
                            isDesktop ? <HeaderBtns /> : null
                        }
                        <div className="menuBtn" onClick={toggleMenu}>
                            <span></span><span></span><span></span>
                        </div>
                        <div className={`mobilePanel ${isMenuOpen ? 'open' : ''}`}>
                            {
                                isMobile ? (
                                    <>
                                        <div className="closeBtn" onClick={toggleMenu}>
                                            <IoMdClose />
                                        </div>
                                        <Nav />
                                        <HeaderBtns />
                                    </>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar;