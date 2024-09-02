import {useEffect, useState, useCallback} from 'react';
import "./App.css";
import {Header} from "./components/Header";
import {CustomAlert} from "./components/CustomAlert";

function App() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isError, setIsError] = useState(false);

    const tg = window.Telegram ? window.Telegram.WebApp : null;
    const dataUnsafe = tg?.initDataUnsafe

    useEffect(() => {
        if (!window.Telegram) {
            console.error('Telegram WebApp API не доступен');
        }
    }, []);

    const onSendData = useCallback(() => {
        if (tg) {
            setLoading(true);
            setIsEnd(false);
            setIsError(false);

            const data = {
                text,
                dataUnsafe
            };

            const webAppQueryId = tg.initDataUnsafe.query_id;
            fetch(`https://aitutelegrambot-production.up.railway.app/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    web_app_query_id: webAppQueryId,
                    result: {
                        type: "article",
                        id: webAppQueryId,
                        title: data.dataUnsafe.toString(),
                        input_message_content: {
                            message_text: data.text,
                        },
                    },
                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    setLoading(false);
                    setIsEnd(true);
                    if (responseData.ok) {
                        tg.close();
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setIsEnd(true);
                    setIsError(true);
                    console.error("Error sending WebAppQuery result:", error);
                });
        } else {
            console.error('Telegram WebApp API не доступен');
        }
    }, [text, tg, dataUnsafe]);

    const resetLoading = () => {
        setLoading(false);
        setIsEnd(false);
        setIsError(false);
    };

    return (
        <div className="App">
            <Header/>
            {loading ? (
                <CustomAlert isEnd={isEnd} isError={isError} onButtonClick={resetLoading}/>
            ) : (
                <>
                    <textarea
                        className="text-box"
                        placeholder="Введите текст..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button className="submit-button" onClick={onSendData}>
                        Отправить
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
