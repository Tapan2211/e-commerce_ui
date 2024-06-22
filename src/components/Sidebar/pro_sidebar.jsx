import React from "react";
import styles from './sidebar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar"; // Use react-pro-sidebar

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { removeToken } from "../../utils/storage";

function ProSidebar() { // Ensure the component name starts with uppercase

    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/');
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar className={styles.app}>
                <Menu>
                    <MenuItem className={styles.menu1} icon={<MenuRoundedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}>
                        <h2> E-Commerce</h2>
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/dashboard" className="link" />}
                        icon={<GridViewRoundedIcon />}>
                        Dashboard
                    </MenuItem>
                    <SubMenu label="Add" icon={<BarChartRoundedIcon />}>
                        <MenuItem
                            component={<Link to="/category" className="link" />}
                            icon={<TimelineRoundedIcon />}>
                            Add Category
                        </MenuItem>
                        <MenuItem
                            component={<Link to='/product' className="link" />}
                            icon={<BubbleChartRoundedIcon />}>
                            Add Product
                        </MenuItem>
                    </SubMenu>
                    <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
                        <MenuItem
                            icon={<AccountCircleRoundedIcon />}>
                            Account
                        </MenuItem>
                        <MenuItem
                            icon={<ShieldRoundedIcon />}>
                            Privacy
                        </MenuItem>
                        <MenuItem
                            icon={<NotificationsRoundedIcon />}>
                            Notifications
                        </MenuItem>
                    </SubMenu>
                    <MenuItem
                        component={<Link to="/about" className="link" />}
                        icon={<ReceiptRoundedIcon />}>
                        About
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/contact" className="link" />}
                        icon={<ReceiptRoundedIcon />}>
                        Contact Us
                    </MenuItem>
                    <MenuItem
                        onClick={handleLogout}
                        icon={<LogoutRoundedIcon />}>
                        Logout
                    </MenuItem>
                </Menu>
            </Sidebar>
            {/* <h1>WELCOME TO E-COMMERCE</h1> */}
        </div>
    )
}

export default ProSidebar; // Ensure the export name matches the component name
