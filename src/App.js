import {useEffect, useState, useCallback} from 'react';
import "./App.css"
import {Header} from "./components/Header";

function App() {
    const [text, setText] = useState('');
    const tg = window.Telegram ? window.Telegram.WebApp : null;
    const user = tg.initData?.user;
    console.log("User data:", tg.initDataUnsafe.user);
    useEffect(() => {
        if (!window.Telegram) {
            console.error('Telegram WebApp API не доступен');
        }
    }, []);

    const onSendData = useCallback(() => {


        if (tg) {
            const data = {
                text,
                user: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    username: user?.username,
                },
            };

            const webAppQueryId = tg.initDataUnsafe.query_id;
            fetch(`https://82a016ec-412e-4465-a98a-3a9ffeb52383-00-wsnn5pc1n1wz.worf.replit.dev/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    web_app_query_id: webAppQueryId,
                    result: {
                        type: "article",
                        id: webAppQueryId,
                        title: `Новое сообщение от: ${data.user.username}`,
                        input_message_content: {
                            message_text: data.text
                        }
                    }
                })
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log("Response from Telegram:", responseData);
                    if (responseData.ok) {
                        tg.close(); // Закрываем WebApp, если отправка успешна
                    }
                })
                .catch(error => console.error("Error sending WebAppQuery result:", error));

        } else {
            console.error('Telegram WebApp API не доступен');
        }
    }, [text, tg, user?.first_name, user?.last_name, user?.username]);

    return (
        <div className="App">
            <Header/>
            <textarea
                className="text-box"
                placeholder="Введите текст..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={onSendData}>
                Отправить
            </button>
        </div>
    );
}

export default App;
