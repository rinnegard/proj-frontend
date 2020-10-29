import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";

function RegisterPage(props) {

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>Welcome</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus nisi, ullamcorper sed gravida eget, cursus ut elit. Aliquam consectetur tortor elit, sit amet porta tortor fermentum id. Morbi at mauris quis magna scelerisque vestibulum nec vel mauris. Nunc hendrerit elementum diam vel fermentum. Aenean mauris massa, pretium a varius non, mattis a justo. Suspendisse dictum porttitor molestie. Nunc blandit nibh in lectus dapibus faucibus. Nunc et ligula porttitor ante placerat facilisis. Morbi orci dui, dapibus in orci quis, dictum facilisis ligula. Aliquam laoreet posuere diam, quis iaculis sem viverra vel. Duis dapibus arcu vel auctor rutrum. Donec sit amet tincidunt enim.
                </p>
                <p>
                    Proin tristique commodo tempus. Nunc efficitur, leo iaculis efficitur sodales, nibh neque vehicula mi, sed volutpat velit justo ultricies justo. Fusce semper ex dui, nec facilisis dolor feugiat non. Ut ut eros ac velit dignissim semper. In dapibus venenatis ipsum eget mattis. Etiam fermentum libero arcu, a sodales quam euismod sit amet. Etiam pellentesque lorem a tellus cursus faucibus. Pellentesque non ultrices felis. Donec ut enim sagittis, tincidunt lorem non, pharetra turpis. Integer posuere ipsum eget egestas blandit. Duis id leo libero. Curabitur blandit tincidunt semper. 
                </p>
            </div>
        </>
    )
}

export default RegisterPage;
