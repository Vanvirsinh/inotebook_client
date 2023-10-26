import Logo from '../../assets/logo.png';
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav>
                <div className="px-10 py-2 bg-[#000] text-[#fff]">
                    <div className='flex justify-between items-center'>
                        <div className='h-24'>
                            <img className='h-full' src={Logo} alt="" />
                        </div>

                        {/* Menu */}
                        <div>
                            <ul className='flex gap-x-5'>
                                <li><NavLink className={({ isActive }) =>
                                    `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to="/">Home</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to="/about">About</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to="/service">Service</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to="/contact">Contact</NavLink></li>
                            </ul>
                        </div>

                        <div>
                            <ul className='flex gap-x-5'>
                                <li><NavLink className={({isActive}) => 
                                `${isActive ? "text-[#fff]" : "text-[#7D7C7C]"}`} to='/login' >Login</NavLink></li>
                                <li><Link className='px-4 pt-1 pb-2 bg-[#fff] text-[#000] rounded'>Register</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;