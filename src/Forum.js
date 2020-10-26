import React, {useState} from 'react';
import './style.css';

export default function Forum(props) {
    var {forum, setForums} = props;
    async function deleteThread(){
        const responce = await fetch('/deleteThread?id=' + forum.id);
        const body = await responce.text();

        if (responce.status !== 200) {
            throw Error(body.message);
        }
        setForums([]);
        return body;
    }
    async function getUser(id) {
        const responce = await fetch('/getUser?id=' + id);
        const body = await responce.json();
        if (responce.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    var [user, setUser] = useState({avatar: ""});
    getUser(forum.author).then(res => {
        setUser(res);
    });
    return (
        <div className="forum">
            <div className="forumAvatar">
                <img src={user.avatar}/>
                <h1>{user.name}</h1>
            </div>
            <div className="forumContent">
                <h1>{forum.title}</h1>
                <p>{forum.text}</p>
                <button className="removeforum" onClick={deleteThread}><i className="fa fa-trash"/></button>
            </div>
        </div>
    );
}