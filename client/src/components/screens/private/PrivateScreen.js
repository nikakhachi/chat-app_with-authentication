import { Link } from 'react-router-dom'; 

function PrivateScreen(props){

    function logOut(){
        localStorage.removeItem("authToken");
    }

    return (
        <div>
            {props.data.map((item, index) => (
                <p key={index} style={{fontSize: '1.5vw'}}>{item.username} Joined in {item.register_date.replace('T', ' ').slice(0, 16)} UTC Time</p>
            ))}
            <button style={{fontSize: '1.5vw', marginTop: '2%'}} onClick={logOut}><Link to='/login'>Log Out</Link></button>
        </div>
    )
}

export default PrivateScreen;