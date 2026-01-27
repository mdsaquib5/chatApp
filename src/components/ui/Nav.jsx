import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

const Nav = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <nav>
            <ul>
                <li className="dropdown" onClick={() => toggleDropdown(0)}><Link to={'/'}>Product <span><FaChevronDown /></span></Link>
                    <ul className={`dropdownItem ${openDropdown === 0 ? 'open-dropdown' : ''}`}>
                        <li><Link to={'/'}>Product 1</Link></li>
                        <li><Link to={'/'}>Product 2</Link></li>
                        <li><Link to={'/'}>Product 3</Link></li>
                    </ul>
                </li>
                <li className="dropdown" onClick={() => toggleDropdown(1)}><Link to={'/'}>About <span><FaChevronDown /></span></Link>
                    <ul className={`dropdownItem ${openDropdown === 1 ? 'open-dropdown' : ''}`}>
                        <li><Link to={'/'}>Product 1</Link></li>
                        <li><Link to={'/'}>Product 2</Link></li>
                        <li><Link to={'/'}>Product 3</Link></li>
                    </ul>
                </li>
                <li className="dropdown" onClick={() => toggleDropdown(2)}><Link to={'/'}>Resource <span><FaChevronDown /></span></Link>
                    <ul className={`dropdownItem ${openDropdown === 2 ? 'open-dropdown' : ''}`}>
                        <li><Link to={'/'}>Product 1</Link></li>
                        <li><Link to={'/'}>Product 2</Link></li>
                        <li><Link to={'/'}>Product 3</Link></li>
                    </ul>
                </li>
                <li><Link to={'/'}>Pricing</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;