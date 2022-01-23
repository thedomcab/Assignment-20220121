let Input = (props) => {
    return <input type={props.type} className={props.className} name={props.name} id={props.id} required={props.required === "true" ? true : false} />
}

export default Input;