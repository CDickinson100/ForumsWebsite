import React, {useState} from 'react';
import Forum from './Forum'
import './style.css';

let name = localStorage.getItem("username");

function createThread() {
    window.location = "/createthread";
}

async function isAuth(name) {
    if (!name) return "false";
    const responce = await fetch('/isAdmin?name=' + name);
    const body = await responce.text();

    if (responce.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

async function callBackendAPI(catagory) {
    const responce = await fetch('/getForums?catagory=' + catagory);
    const body = await responce.json();

    if (responce.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

export default function ForumsList(props) {
    var {catagory} = props;

    var [forums, setForums] = useState([]);
    var [auth, setAuth] = useState("");

    if (forums.length === 0) callBackendAPI(catagory).then(res => setForums(res));
    if (!auth) isAuth(name).then(res => setAuth(res));

    var copyForums = [...forums];
    copyForums.reverse();

    return (
        <div className="forumsList">
            {auth === "true" && <button onClick={createThread} id="newThread"
                                        className="newThread">Post New Thread
            </button>}
            <br/>
            <br/>
            {copyForums.map(forum => {
                return <Forum key={forum.id} forum={forum} setForums={setForums}/>
            })}
            <br/>
        </div>
    );
}