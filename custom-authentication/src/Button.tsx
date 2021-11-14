import {button} from "aws-amplify";
import React from "react";

const styles = {
    button:{
        backgroundColor:'#006bfc',
        color:'white',
        width:316,
        height:45,
        fontWeight:600,
        fontSize:14,
        cursor:'pointer',
        border:'none',
        outline:'none',
        borderRadius:3,
        marginTop:25,
        boxShadow:'0px 1px 3px rgba(0,0,0,.3)'
    }
}

const Button = ({onClick,title}:{onClick:()=>void,title:string})=>{
    return (
        <button
            style={styles.button}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button;