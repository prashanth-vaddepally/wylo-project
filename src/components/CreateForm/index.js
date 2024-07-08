import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const CreateForm = ({addStudent, editStudent, students}) => {
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    performance: '',
    school: '',
    village: '',
    isEditing: false,
  })
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    if (id) {
      const existingStudent = students.find(student => student.id === id)
      if (existingStudent) {
        setFormState({
          ...existingStudent,
          isEditing: true,
        })
      }
    }
  }, [id, students])

  const handleChange = event => {
    setFormState({...formState, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (
      !formState.name ||
      !formState.performance ||
      !formState.school ||
      !formState.village
    ) {
      setFormError('**Please fill all fields.**')
      return
    }
    setFormError('')

    const newStudent = {
      id: formState.isEditing ? formState.id : Date.now().toString(),
      name: formState.name,
      performance: formState.performance,
      school: formState.school,
      village: formState.village,
    }

    if (formState.isEditing) {
      editStudent(newStudent)
    } else {
      addStudent(newStudent)
    }

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="performance">Performance</label>
        <input
          type="text"
          id="performance"
          name="performance"
          value={formState.performance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="school">School</label>
        <input
          type="text"
          id="school"
          name="school"
          value={formState.school}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="village">Village</label>
        <input
          type="text"
          id="village"
          name="village"
          value={formState.village}
          onChange={handleChange}
        />
      </div>
      {formError && <p className="error-message">{formError}</p>}
      <button type="submit">{formState.isEditing ? 'Update' : 'Submit'}</button>
    </form>
  )
}

export default CreateForm
