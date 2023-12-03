import React from 'react';
import Navbar from './Navbar';
//import { Link } from '@reach/router'


class HomePage extends React.Component {
    /*
	constructor( props ) {
		super( props );

		this.state = {
			loading : false,
			posts: [],
			error: ''
		};
	}

	createMarkup = ( data ) => ({
		__html: data
	});
    

	componentDidMount() {
		const wordPressSiteURL = clientConfig.siteUrl;

		this.setState( { loading: true }, () => {
			axios.get( `${wordPressSiteURL}/wp-json/wp/v2/posts/` )
				.then( res => {
					if ( 200 === res.status ) {
						if ( res.data.length ) {
							this.setState( { loading: false, posts: res.data } );
						} else {
							this.setState( { loading: false, error: 'No Posts Found' } );
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		} )
	}
     */
	render() {

		//const { loading, posts, error } = this.state;

		return(
			<React.Fragment>
				<Navbar/>
                <h1>Welcome to My First React!</h1>
			</React.Fragment>
		);
	}
}

export default HomePage;