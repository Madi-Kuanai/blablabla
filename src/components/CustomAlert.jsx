import React from 'react';
import Lottie from "react-lottie";
import loadingAnimationData from '../assets/alert-animation.json';
import okAnimationData from '../assets/ok-animation.json';
import '../CustomAlert.css';

export function CustomAlert(props) {
    const {isEnd, isError, onButtonClick} = props;

    const defaultOptions = {
        loop: true, autoplay: true, animationData: loadingAnimationData, rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const endOptions = {
        loop: false, autoplay: true, animationData: okAnimationData, rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (<div className="mAlert">
            <div className="alert-body">
                {isEnd ? (isError ? (<h1 className="alert-title">Ошибка, свяжитесь с поддержкой</h1>) : (
                        <h1 className="alert-title">Готово</h1>)) : (<h1 className="alert-title">Отправка...</h1>)}
                <div className="lottie">
                    <Lottie
                        options={isEnd ? endOptions : defaultOptions}
                        height={"50%"}
                        width={"50%"}
                    />
                </div>
            </div>
            <div className="alert-button">
                <button onClick={onButtonClick}>Готово</button>
            </div>
        </div>);
}
