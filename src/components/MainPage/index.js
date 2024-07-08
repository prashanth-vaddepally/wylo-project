import {Link} from 'react-router-dom'

const MainPage = ({students}) => (
  <div className="main-page">
    <h1>Distrinct-Level Cultural Event</h1>
    <p>
      Dear students please click on the button provided below to enroll your
      participation for the cultural event.
    </p>
    {students.map(student => (
      <div key={student.id} className="student-card">
        <h2>Name:{student.name}</h2>
        <p>
          <strong>Performance:</strong> {student.performance}
        </p>
        <p>
          <strong>School:</strong> {student.school}
        </p>
        <p>
          <strong>Village:</strong> {student.village}
        </p>
        <Link to={`/edit/${student.id}`}>
          <button className="edit-button" type="button">
            Edit
          </button>
        </Link>
      </div>
    ))}
  </div>
)

export default MainPage
