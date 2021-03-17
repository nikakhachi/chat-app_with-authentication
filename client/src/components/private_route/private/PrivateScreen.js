import './privateScreen.css'
import Chatbox from './chatbox/chatbox';
import Profile from './users/users';
import Header from './header/header';

function PrivateScreen(){
    return (
        <div id='private-screen'>
            <Header />
            <div id='private-main'>
                <Profile />
                <Chatbox />
            </div>
        </div>
    )
}

export default PrivateScreen;