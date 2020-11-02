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

async function auth() {
    if (await isAuth(name) === "false") {
        if (document.getElementById("newThread")) {
            document.getElementById("newThread").style.visibility = "hidden";
        }
    }

}

auth();

export default function ForumsList(props) {
    var {catagory} = props;

    var [forums, setForums] = useState([]);
    if (forums.length === 0) callBackendAPI(catagory).then(res => setForums(res));

    var copyForums = [...forums];
    copyForums.reverse();

    return (
        <div className="forumsList">
            <button onClick={createThread} id="newThread"
                    className="newThread">Post New Thread
            </button>
            <br/>
            <br/>
            {copyForums.map(forum => {
                return <Forum key={forum.id} forum={forum} setForums={setForums}/>
            })}
            <br/>
        </div>
    );
}