import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import MainPage from './components/MainPage'
import CreateForm from './components/CreateForm'
import './App.css'

class App extends React.Component {
  state = {
    students: [],
    darkMode: false,
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode,
    }))
  }

  addStudent = student => {
    this.setState(prevState => ({
      students: [...prevState.students, student],
    }))
  }

  editStudent = updatedStudent => {
    this.setState(prevState => ({
      students: prevState.students.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    }))
  }

  render() {
    const {students, darkMode} = this.state
    const appClass = darkMode ? 'app-container dark-mode' : 'app-container'

    return (
      <Router>
        <div className={appClass}>
          <button
            onClick={this.toggleDarkMode}
            className="mode-toggle"
            type="button"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MainPage
                    students={students}
                    editStudent={this.editStudent}
                  />
                  <Link to="/create">
                    <button className="nav-button" type="button">
                      Create New Entry
                    </button>
                  </Link>
                </>
              }
            />
            <Route
              path="/create"
              element={
                <>
                  <CreateForm
                    addStudent={this.addStudent}
                    students={students}
                  />
                  <Link to="/">
                    <button className="nav-button" type="button">
                      Back to Entries
                    </button>
                  </Link>
                </>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <CreateForm
                  students={students}
                  editStudent={this.editStudent}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App
