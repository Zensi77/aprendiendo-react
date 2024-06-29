import './index.css'
import ReactDOM from 'react-dom/client'
import { TwitterFollowCard } from './TwitterFollowCard'

const root = ReactDOM.createRoot(document.getElementById('root'))

const formatUserName = (userName) => `@${userName}`; // funcion que recibe un userName y devuelve un string con el formato '@userName'
// const user={isFollowing:false, userName: formatUserName('rcko')}; // crea un objeto user con las propiedades isFollowing y userName

const users = [
  { userName: 'AlexHernan', isFollowing: true },
  { userName: 'juanma', isFollowing: false },
  { userName: 'elonMusk', isFollowing: false }
]

root.render(
  // <section className='App'> 
  //   <TwitterFollowCard formatUserName={formatUserName} userName='AlexHernan' initialIsFollowing>
  //     Alex Hernandez
  //   </TwitterFollowCard>
  //   <TwitterFollowCard formatUserName={formatUserName} userName='juanma'>
  //     Juanma Perez
  //   </TwitterFollowCard>
  //   <TwitterFollowCard formatUserName={formatUserName} userName='elonMusk'>
  //     Elon Musk
  //   </TwitterFollowCard>
  //   {/* <TwitterFollowCard {... user}> // Operador spread para pasar todas las propiedades de user a TwitterFollowCard
  //     Pablo Rick
  //   </TwitterFollowCard> */}
  // </section>

  <section className='App'>
    {
      users.map((user) => (
        <TwitterFollowCard key={user.userName} formatUserName={formatUserName} userName={user.userName} initialIsFollowing={user.isFollowing}>
          {user.userName}
        </TwitterFollowCard>
      ))
    }
  </section>
)

// Si renderizo la app se propaga hacia abajo todos sus hijos, si renderizo un componente se propaga hacia arriba