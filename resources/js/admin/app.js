import React from 'react';

const Home = () => {

    return (
        <div>
            <h1>Admin App</h1>
        </div>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Home />, document.getElementById('app'));
}