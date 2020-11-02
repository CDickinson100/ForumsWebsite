import React, {useState} from 'react';

export default function Dropdown(props) {
    let {setName} = props
    var [visible, setVisible] = useState(false);

    window.addEventListener("click", function (event) {
        if (!event.target.matches('.DropdownButton')) {
            setVisible(false);
        } else {
            setVisible(!visible);
        }
    });

    function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setName("");
    }

    return (
        visible ? <div id="myDropdown" className="dropdown-content">
            <button className="avatarbtn" id="avatarbtn">Change Avatar</button>
            <button onClick={logout}>Logout</button>
        </div> : null
    );
}
