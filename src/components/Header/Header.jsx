import './Header.css'
import Logo from '../../assets/white-logo.svg?component'
function Header(props){


    return(
        <div className='header'><div className='logo-container'><Logo/></div><div className='header-content'>{props.children}</div></div>
    )
}

export default Header