import React from 'react';
import './login.css';

let name = localStorage.getItem("username");

async function getAuthor() {
    const responce = await fetch('/getUserFromName?name=' + name);
    const body = await responce.json();

    if (responce.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

async function isAuth(name) {
    const responce = await fetch('/isAdmin?name=' + name);
    const body = await responce.text();

    if (responce.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

async function createThread() {
    let author = await getAuthor();
    if (await isAuth(name) === "false") {
        window.location = "/";
        return;
    }
    var catagory = document.getElementById('cat').value;
    var title = document.getElementById('title').value;
    var text = document.getElementById('text').value;
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'author': author.id,
            'title': title,
            'text': text,
            'catagory': catagory
        })
    };
    const responce = await fetch('/createThread', requestOptions);
    const body = await responce.text();

    if (responce.status !== 200) {
        throw Error(body.message);
    }
    window.location = "/";
    return body;
}

export default function CreateThread() {
    return (
        <main>
            <div className="content">
                <div className="login">
                    <label htmlFor="cat"><b>Category</b></label>
                    <select id="cat">
                        <option value="news">News</option>
                    </select>
                    {/*<input type="text" placeholder="Enter Category" id="cat" name="cat" required/>*/}
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" placeholder="Enter Title" id="title" name="title" required/>
                    <label htmlFor="text"><b>Text</b></label>
                    <input type="text" placeholder="Enter Body" id="text" name="text" required/>
                    <p id="incorrect"></p>
                    <button type="submit" onClick={createThread}>Post Thread</button>
                </div>
            </div>
        </main>
    );
}
