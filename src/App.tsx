import React, {CSSProperties, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App: React.FC = () => {
    const [count, setCount] = useState(0);
    const [buttonColor, setButtonColor] = useState<CSSProperties>({backgroundColor: 'red'});
    const [checked, setChecked] = useState(false);


    const changeButtonColor = () =>
        setButtonColor({backgroundColor: (buttonColor.backgroundColor === 'red' ? 'blue' : 'red')})

    const changeButtonState = (event: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(event.target.checked)

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>

            <button style={buttonColor}
                    onClick={changeButtonColor}>
                Change to {buttonColor.backgroundColor === 'red' ? 'blue' : 'red'}
            </button>

            <br />
            <button disabled={checked}>Just click to win something</button>
            <br />

            <input type='checkbox' data-testid='checkboxState' onChange={changeButtonState}/>Check me
        </>
    )
};

export default App
