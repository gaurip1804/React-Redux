import React from 'react';
import { connect } from 'react-redux';


class LogOut extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            pageID:'logout'
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="main-container" id="logout">
                <div className="container text-center">
                    <h4 className="mt20">Logged Out Successfully !</h4>
                </div>
            </div>
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
	LogOut
);