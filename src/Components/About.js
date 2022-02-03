import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            <p>Created by Ivan Leegstra with React &copy; 2022</p>
            <br/> <Link to="/" className='link'>Go back!</Link>
        </div>
    )
}

export default About
