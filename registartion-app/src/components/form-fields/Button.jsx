let Button = (props) => {
    return <button type={props.type} className={props.className} onClick={props.handler}>{props.children}</button>
}

export default Button;