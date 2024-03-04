
import Notes from '../componets/Notes'

const Home = (props) => {


  return (
    <div>
      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home
