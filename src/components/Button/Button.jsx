import './Button.css'

function Button(props){


    function handleClick(e){

        

        let b = e.target;
        e.target.classList.add('clicked');

        

        setTimeout(()=>{
            b.classList.remove('clicked');

            props.onClickCallback();

        },150)

    }


    return(
        <div onClick={handleClick} className='button'>{props.children}</div>
    )
}

export default Button