import React from 'react';
import './chat.scss';

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>Friend A</span>
                    </div>
                    <div className="chat-headerBtn">
                        <i className="fa-light fa-magnifying-glass"></i>
                        <i className="fa-light fa-phone-volume"></i>
                        <i className="fa-light fa-video"></i>
                    </div>
                </div>
                <div className="chat-view">
                    <div className="message-view">
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="YourMessage">
                            <img src="../Img/Avatar1.png" alt="" />
                            <span>Hello</span>
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                        <div className="MyMessage">
                            <span>Toio xin chao ban</span>
                            <img src="../Img/Avatar.png" alt="" />
                        </div>
                    </div>
                    <div className="chat-toolbar">
                        <i class="fa-light fa-face-smile-beam"></i>
                        <i class="fa-light fa-image"></i>
                    </div>
                    <div className="chat-inputBox">
                        <div className="chat-input">
                            <input type="text" placeholder="Nhập tin nhắn" />
                            <i class="fa-solid fa-paper-plane-top"></i>
                            <i class="fa-solid fa-thumbs-up"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-detail">
                <img src="../Img/Avatar1.png" alt="" />
                <span>Friend A</span>
            </div>
        </div>
    );
};

export default Chat;
