let Select = (props, children) => {
    return <select name={props.name} id={props.id} className={props.className} required={props.required === 'true' ? true : false}>
        {props.children}
    </select>
}

export default Select;