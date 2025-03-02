import '../css/messages.css';
function messages() {
    return (
    <div className="bodyClass">
        <div className="header">
            <img src="images/NORMSLIST.png" alt="NormsList Logo"/>
            <h2>Messaging</h2>
        </div>
        
        <div className="chat-container">
            <div className="messages-area">
                <div className="message received">Hi! </div>
                <div className="message sent">Hey!</div>
            </div>
            
            <div className="message-input-container">
                <input type="text" className="message-input" placeholder="Type a message..."/>
                <button className="send-button">
                    <div className="send-icon"></div>
                </button>
            </div>
        </div>
    </div>
    );
}

export default messages;