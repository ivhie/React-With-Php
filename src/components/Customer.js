import React from "react";
import Navbar from './Navbar';
import axios from "axios";
//import renderHTML from 'react-render-html';
//import { useState } from 'react';
//import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import { useState, useEffect,useMemo } from "react";

import clientConfig from '../client-config';
import Loader from "../loader.gif";

import TextField from "@mui/material/TextField"; // use for product search filter

// Pagination
import Pagination from '../Pagination';
import '../pagination.scss';

// demo link https://www.pluralsight.com/guides/working-with-bootstraps-modals-react

let PageSize = 10;
//let PageShow = 5;

const CustomerListing = () => {

	//Search Field Here
	const [inputText, setInputText] = useState("");
	let inputHandler = (e) => {
	  //convert input text to lower case
	  var lowerCase = e.target.value.toLowerCase();
	  setInputText(lowerCase);

	  	fetch("http://localhost/crud/customers.php")
		.then(response => {
			return response.json()
		})
		.then(data => {
			//console.log(lowerCase);
		   //start ur search filter 
			const filteredData = data.filter(item => {
				  if (!lowerCase) return true;
				  if (
					item.id.includes(lowerCase) 
					|| item.completename.toLowerCase().includes(lowerCase)
					|| item.phonenumber.includes(lowerCase)
					|| item.address.toLowerCase().includes(lowerCase)
					) {
					return true;
				  }
				  return false;
				});
         
			//start ur pagination
			const firstPageIndex = (currentPage - 1) * PageSize;
			const lastPageIndex = firstPageIndex + PageSize;
			setCustomers2(filteredData); 
			setCustomers(filteredData.slice(firstPageIndex, lastPageIndex));
			//console.log(data);
		})




	};


    // constance for pagination parameter
	const [currentPage, setCurrentPage] = useState(1);
    

	// Get all customers
    const [customers, setCustomers] = useState([]);
	const [customers2, setCustomers2] = useState([]);

	const fetchCustomersData = () => {
		fetch("http://localhost/crud/customers.php")
		.then(response => {
			return response.json()
		})
		.then(data => {

			//start ur pagination
			const firstPageIndex = (currentPage - 1) * PageSize;
			const lastPageIndex = firstPageIndex + PageSize;
			setCustomers2(data); 
			setCustomers(data.slice(firstPageIndex, lastPageIndex));
			//console.log(data);
		})
	}

	useEffect(() => {
		fetchCustomersData()
	}, []);

	

    // Hide & Show Modal
	const [isOpen, setIsOpen] = React.useState(false);
	const showModal = () => {
		setIsOpen(true);
		setCust_id('0');
		setCompletename('');
		setPhonenumber('');
		setAddress('');
		
	};

	const hideModal = (e) => {
		setIsOpen(false);
		e.preventDefault();
		//fetchCustomersData();
		
	};
    
	const [completename,setCompletename] = React.useState('');
	const [phonenumber,setPhonenumber] = React.useState('');
	const [address,setAddress] = React.useState('');
	const [cust_id,setCust_id] = React.useState('0');
    

	// Form  submission
	const handleSubmit = (e) => {
		e.preventDefault();

		//Validate Entries
		if(completename.length === 0){
			var completenamecss = document.getElementById('completename');
			completenamecss.style.border = "1px solid red";
			
		} else if(phonenumber.length === 0) {
			
            var completenamecss = document.getElementById('completename');
			completenamecss.style.border = "1px solid #ced4da";
			var phonenumbercss = document.getElementById('phonenumber');
			phonenumbercss.style.border = "1px solid red";
			
		} else if(address.length === 0){
			
			var completenamecss = document.getElementById('completename');
			completenamecss.style.border = "1px solid #ced4da";

			var phonenumbercss = document.getElementById('phonenumber');
			phonenumbercss.style.border = "1px solid #ced4da";

			var addresscss = document.getElementById('address');
			addresscss.style.border = "1px solid red";
			
		} else  {

			var completenamecss = document.getElementById('completename');
			completenamecss.style.border = "1px solid #ced4da";

			var phonenumbercss = document.getElementById('phonenumber');
			phonenumbercss.style.border = "1px solid #ced4da";

			var addresscss = document.getElementById('address');
			addresscss.style.border = "1px solid #ced4da";


			const postdata_url = 'http://localhost/crud/customers.php?task=save';
			let fData =  new FormData();
			fData.append('cust_id',cust_id);
			fData.append('completename',completename);
			fData.append('phonenumber',phonenumber);
			fData.append('address',address);
			axios.post(postdata_url,fData)
			.then(response=>(alert(response.data),setIsOpen(false),fetchCustomersData())) //display alert, hide form, refresh customers tables
			.catch(error=>alert(error));
		

			
		}

		
	}


	// Form  Edit Customer
	const handleEditForm = (id) => (e) => {
		e.preventDefault();
		setIsOpen(true);
		fetch("http://localhost/crud/customers.php?task=get&id="+id)
		.then(response => {
			return response.json()
		})
		.then(data => {
			//document.getElementById("cust_id").value = data.id;
			//document.getElementById("completename").value = data.complete_name;
			//document.getElementById("phonenumber").value = data.phone;
			//document.getElementById("address").value = data.address;
			setCust_id(data.id);
			setCompletename(data.complete_name);
			setPhonenumber(data.phone);
			setAddress(data.address);
			console.log(data);


		})
	}

	// Form  Delete Customer
	const handleDeleteCust = (id) => (e) => {
		e.preventDefault();
		fetch("http://localhost/crud/customers.php?task=delete&id="+id)
		.then(response => {
			return response.json()
		})
		.then(data => {
			alert(data.msg);
			fetchCustomersData();
			console.log(data);
		})
	}
	


	// Pagination script
	const currentTableData = useMemo(() => {
	   const firstPageIndex = (currentPage - 1) * PageSize;
	   const lastPageIndex = firstPageIndex + PageSize;
	   fetchCustomersData();
	   return customers2.slice(firstPageIndex, lastPageIndex);
	   
	}, [currentPage]);

  return (

	<React.Fragment>

		
		<Modal show={isOpen} onHide={hideModal}>
			<form  className="consumer_form">
			<ModalHeader>
				<ModalTitle className="custName">New  Customer  <span className="text-name">&nbsp;</span></ModalTitle>
			</ModalHeader>
			<ModalBody>
			    <input type="hidden"  name="cust_id" id="cust_id" value={cust_id} onChange = { (e) => setCust_id(e.target.value)}  />
				<div className="form-row">
					<div className="form-group col-md-6">
					<label htmlFor="completename">Complete Name *</label>
					<input type="text" className="form-control" name="completename" id="completename" value={completename} onChange = { (e) => setCompletename(e.target.value)}  />
					</div>
					<div className="form-group col-md-6">
					<label htmlFor="phonenumber">Phone Number *</label>
					<input type="text" className="form-control" name="phonenumber" id="phonenumber" value={phonenumber} onChange= { (e) => setPhonenumber(e.target.value)}  />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="address">Address *</label>
					<input type="text" className="form-control" name="address" id="address" value={address} onChange= { (e) => setAddress(e.target.value)} />
				</div>
				
			
			
				

			</ModalBody>
			<ModalFooter>
				<button onClick={hideModal}  className="btn btn-danger">Cancel</button>
			    <button  className="btn btn-primary" name="save" onClick={handleSubmit} >Save</button>
			</ModalFooter>
			</form>
			
		</Modal>
      
		<div className="container main-wrapper">
			<Navbar/>
			<h1 className="page-title">Customer Listing</h1>
		    <a href="#" className="btn btn-primary pull-right mb-3" onClick={showModal}>Add New</a>
			{ /* Search Box here! */ }
			<div className="search pull-left mb-3">
				<TextField
				 id="outlined-basic"
				 onChange={inputHandler}
				 variant="outlined"
				 fullWidth
				 label="Search"
				/>
			</div>
			<table className="table">
				<thead>
					<tr>
					<th scope="col">ID</th>
					<th scope="col">Complete Name</th>
					<th scope="col">Phone Number</th>
					<th scope="col">Address</th>
					<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
				{
				customers.length > 0 && (
                  // console.log(customers)
				   customers.map((customer) =>
				   <tr key={customer.id}>
						<td>{customer.id}</td>
						<td>{customer.completename}</td>
						<td>{customer.phonenumber}</td>
						<td>{customer.address}</td>
						<td><a href="#"  className="btn btn-primary" onClick={ handleEditForm(customer.id)} >Edit</a> &nbsp; <a href="#"  onClick={ handleDeleteCust(customer.id)} className="btn btn-danger">Delete</a></td>
					</tr>
				 
				   )
				  

				)
				}
					
				</tbody>
			</table>

			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={customers2.length}
				pageSize={PageSize}
				onPageChange={page => setCurrentPage(page)}
			/>
		</div>

	</React.Fragment>
  );

};

export default CustomerListing;