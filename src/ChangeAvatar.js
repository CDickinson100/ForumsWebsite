import React, {useState} from 'react';

export default function ChangeAvatar(props) {
    var {name} = props;
    var [visible, setVisible] = useState(false);

    var setAvatar = async (user, avatar) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'avatar': avatar,
                'user': user
            })
        };
        const responce = await fetch('/setAvatar', requestOptions);
        const body = await responce.text();

        if (responce.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    window.addEventListener("click", function(event){
        if (!event.target.matches('.changeAvatar') && !event.target.matches('.avatarbtn') && !event.target.matches('.useravatar')) {
            setVisible(false);
        } else if (event.target.matches('.avatarbtn')) {
            setVisible(true);
        }
    });

    async function changeavatar() {
        let avatar = document.getElementById("useravatar").files[0];
        if (!avatar) return;
        let base64 = await toBase64(avatar);
        document.getElementById("avatar").setAttribute('src', base64);
        setAvatar(name, base64);
    }

    function closeAvatar() {
        setVisible(true);
    }

    return (
        visible ? <div id="changeAvatar" className="changeAvatar">
            <input className="useravatar" id="useravatar" type="file"/>
            <button onClick={closeAvatar}>Close</button>
            <button onClick={changeavatar}>Okay</button>
        </div> : null
    );
}
