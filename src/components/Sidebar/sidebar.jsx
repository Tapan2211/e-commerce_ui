import React, { useState } from "react";
import styles from './sidebar.module.css';
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/storage";



function Sidebar() {
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/');
    };

    const toggleDashboardMenu = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };

    return (
        <div className={styles.sidebar}>
            <h2>E-Commerce</h2>
            <ul>

                {/* <div onClick={toggleDashboardMenu} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Dashboard</span>
                    {isDashboardOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {isDashboardOpen && (
                    <ul className={styles.submenu}>
                        <li><Link to="/dashboard/overview">Overview</Link></li>
                        <li><Link to="/dashboard/stats">Stats</Link></li>
                        <li><Link to="/dashboard/reports">Reports</Link></li>
                    </ul>
                )} */}
                <li style={{ width: '100%' }}>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/contact' >Contact</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
