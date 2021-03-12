import { Link } from 'react-router-dom'; 
import { useState } from 'react';

function PrivateScreen(props){

    const [img, setImg] = useState(undefined);

    function logOut(){
        localStorage.removeItem("authToken");
    }

    console.log(img);

    return (
        <div>
            {props.data.map((item, index) => (
                <p key={index} style={{fontSize: '1.5vw'}}>{item.username} Joined in {item.register_date.replace('T', ' ').slice(0, 16)} UTC Time</p>
            ))}
            <button style={{fontSize: '1.5vw', marginTop: '2%'}} onClick={logOut}><Link to='/login'>Log Out</Link></button>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImg(e.target.files[0])}
            />
        </div>
    )
}

export default PrivateScreen;