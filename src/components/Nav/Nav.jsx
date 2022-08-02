import './Nav.css'

function Nav(props){



    return(
        <div className="nav">
            {props.children}
        </div>
    )
}

export default Nav