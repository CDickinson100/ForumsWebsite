import React, {useEffect, useState} from 'react';
import ForumsList from "./ForumsList";

export default function App() {
    return (
        <main>
            <ForumsList catagory={"news"}/>
        </main>
    );
}
