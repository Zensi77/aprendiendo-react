import './App.css';
import { useState } from 'react'; // importa el hook useState de react, que permite añadir estado a los componentes funcionales

export function TwitterFollowCard({ formatUserName, userName='unknow', children, initialIsFollowing }) { // recibe las props formatUserName, userName, name, isFollowing, la prop formatUserName es una funcion    
    const [isFollowingState, setIsFollowingState] = useState(initialIsFollowing); // destructura el estado en isFollowingState y setIsFollowingState, el valor inicial de isFollowingState es false
    
    const text = isFollowingState ? 'Siguiendo' : 'Seguir'; // si isFollowing es true, text es 'Siguiendo', si es false, text es 'Seguir'
    const buttonClassName = isFollowingState ? 'tw-followCard-button tw-followCard-button is-following' : 'tw-followCard-button'; // si isFollowing es true, buttonClassName es 'tw-followCard-button tw-followCard-button-following', si es false, buttonClassName es 'tw-followCard-button'
    
    const handleClick = () => { // funcion que se ejecuta cuando se hace click en el boton
        setIsFollowingState(!isFollowingState); // cambia el valor de isFollowingState a su valor contrario
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' src={`https://unavatar.io/${userName}`} alt="avatar" />
                <div>
                    <strong className='tw-followCard-info'> { children }</strong>
                    <span className='tw-followCard-infoUserName'>{ formatUserName(userName) }</span>
                </div>
            </header>
            <aside>
                    <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCard-text'>{text}</span>
                    <span className='tw-followCard-stopFollow'>Dejar de Seguir</span>
                    </button>
            </aside>
        </article>
    )
}

// Un componente es una factoria de elementos de React, es una funcion que recibe props y devuelve un elemento de React
// El elemento es renderizado en el DOM por ReactDOM.render