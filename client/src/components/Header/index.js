import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { updateSearchInput } from '../../redux'
import { connect } from 'react-redux'

import './index.css'

const Header = props => {
    const [searchVisibility, toggleSearchVisibility] = useState(false)

    const onClickSearchIcon = () => toggleSearchVisibility(prevSearchVisibility => !prevSearchVisibility)

    const onChangeSearchInput = event => props.updateSearchInput(event.target.value)

    return (
        <nav className='navbar'>
            <div className='nav-content'>
                <Link className='header-link' to='/'>
                    <img className='website-logo' alt='website logo' src='https://cdn.dribbble.com/users/131733/screenshots/5472304/media/1ce3d40552e2079cb3b8a355f78f4d27.png' />
                </Link>
                {searchVisibility && <input className='search-input' type='search' placeholder='Search recipe' value={props.searchInput} onChange={onChangeSearchInput} />}
                <button className='search-button' type='button' onClick={onClickSearchIcon}>
                    <BiSearch className='search-icon' />
                </button>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        searchInput: state.searchInput
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSearchInput: value => dispatch(updateSearchInput(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)