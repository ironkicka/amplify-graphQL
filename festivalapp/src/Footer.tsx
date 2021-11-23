import { Link } from "react-router-dom"

const Footer = ()=>{
    return(
        <div style={footerStyle}>
            <Link to={"/admin"}>
                Admins
            </Link>
        </div>
    )
}

const footerStyle = {
    borderTop:'1px solid #ddd',
    display:'flex',
    alignItems:'center',
    padding:20
}

export default Footer;