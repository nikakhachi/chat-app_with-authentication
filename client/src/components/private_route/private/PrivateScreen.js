import './privateScreen.css'
import Chatbox from './chatbox/chatbox';
import Profile from './profile/profile';
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