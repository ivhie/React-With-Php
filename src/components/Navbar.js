import React, { useContext } from 'react';
import NavLink from './NavLink';
//import { isLoggedIn } from "./functions";
//import ToggleSidebarBtn from "./dashboard/sidebar/ToggleSidebarBtn";
import AppContext from "./context/AppContext";

const Navbar = () => {
    
	const [ store, setStore ] = useContext( AppContext );
   
	const handleLogout = () => {
		localStorage.removeItem( 'token' );
		localStorage.removeItem( 'useName' );

		setStore( {
			...store,
			token: '',
			useName: ''
		} );
		window.location.href = '/';
	};


	return (
		<nav className="navbar my-navbar navbar-expand-lg main-navbar">
			<div >
				<ul className="navbar-nav my-navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink to="/">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/customer">Customer</NavLink>
					</li>
					
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
