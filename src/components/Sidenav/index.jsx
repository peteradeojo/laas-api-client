import { Link, useNavigate } from 'react-router-dom';
import {
	FaArrowAltCircleRight,
	FaArrowDown,
	FaArrowRight,
	FaCog,
	FaHome,
	FaPlus,
} from 'react-icons/fa';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

import styles from './style.module.scss';
import MobileNav from './Mobile';
import DesktopSidenav from './Desktop';

const Sidenav = ({ userHook, appsHook }) => {
	const isMobile = useMediaQuery('(max-width: 768px)');

	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('authToken');
		navigate('/login');
	};

	return !isMobile ? (
		<DesktopSidenav userHook={userHook} appsHook={appsHook} logout={logout} />
	) : (
		<MobileNav userHook={userHook} appsHook={appsHook} logout={logout} />
	);
};

export default Sidenav;
