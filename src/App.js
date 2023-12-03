import React from 'react';
//import './App.css';
import './style.css';
import { Router } from "@reach/router";
import AppProvider from "./components/context/AppProvider";
import HomePage from "./components/HomePage";
import CustomerListing  from "./components/Customer";


class App extends React.Component {

	render() {
		return (
			<AppProvider>
				<Router>
					<HomePage path="/"/>
          <CustomerListing path="/customer"/>
				</Router>
			</AppProvider>
		);
	}
}

export default App;