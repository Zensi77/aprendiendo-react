import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  /*
  [] -> Se ejecuta solo una vez, cuando el componente se monta
  [enabled] -> Se ejecuta cuando el componente se monta y cuando cambia la dependencia
  undefined -> Se ejecuta cada vez que el componente se renderiza
  */

  useEffect(() => {
    console.log('effect', enabled)

    const handleMoove = (event) => {
      const { clientX, clientY } = event
      console.log(clientX, clientY)

      setPosition({ x: clientX, y: clientY });
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMoove)
    }

    // cleanup
    // Se ejecuta cuando el componente se desmonta
    // Se ejecuta cuando cambia la dependencia, antes de ejecutar el efecto
    return () => {
      console.log('cleanup', enabled)
      window.removeEventListener('pointermove', handleMoove)
    }
    /*
    En consola uso getEventListeners(windows) para ver los eventos que se están escuchando
    */
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled) // Agrega la clase no-cursor si enabled es true
    // otra forma de hacerlo document.body.style.cursor = enabled ? 'none' : 'auto'

    if (!enabled) {
      setPosition({ x: -20, y: -20 })
    }

    return () => {
      document.body.classList.remove('no-cursor');
    }
  }, [enabled])

  const FollowMouse = () => {
  return (
    <>
            <div style={
        {
            position: 'absolute',
            backgroundColor: '#09f',
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }
        }
        />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

  return (
    <>
      <main>
        <h1>Mouse Follower</h1>
        <FollowMouse />
      </main>
    </>
  )
}

export default App

// Despliegue de la aplicación
// En consola npm run build, genera la carpeta dist
// Netlify drop -> Drag and drop de la carpeta dist
