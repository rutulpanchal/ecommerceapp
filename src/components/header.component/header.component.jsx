import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../asset/logo.svg';
import { auth } from '../../firebase/firebase.utils';
import './header.style.scss';


const Header = ({currentUser}) => (
    <div className='header'>
        
        <Link className='logo-container' to ='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                shop
            </Link>
            <Link className='option' to='/shop'>
                contact
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
                :
                <Link className='option' to="/signin"> sign in</Link>
            }
        </div>
        
    </div>
)
export default Header;