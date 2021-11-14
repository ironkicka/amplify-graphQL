const styles = {
    container:{
        margin:'0 auto',
        padding:'50px 100px',
    }
}
const Container = (props:any)=>{
    return (
        <div style={styles.container}>
            {props.children}
        </div>
    )
}

export default Container;