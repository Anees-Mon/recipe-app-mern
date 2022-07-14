import { Link } from 'react-router-dom'

import './index.css'

const NotFound = () => (
    <div className='not-found-content'>
        <img className='not-found-image' alt='not found' src='https://img.freepik.com/free-vector/page-found-with-people-connecting-plug-concept-illustration_114360-1939.jpg' />
        <h1 className='not-found-title'>Page Not Found</h1>
        <p className='not-found-description'>We are sorry, the page you requested could not be found. Please go back to the homepage</p>
        <Link to="/">
            <button className="not-found-button" type="button">Home Page</button>
        </Link>
    </div>
)

export default NotFound