import React from 'react';
import AppRouter from '../routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<AppRouter />
			</div>
		);
	}
}

export default App;
