import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import About from './Components/About'
import { useState, useEffect } from 'react'




function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch ('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    //Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch (`http://localhost:5000/tasks/${id}` )
      const data = await res.json()
  
      return data
    }

//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  /* const id=Math.floor(Math.random() * 10000) +1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask]) */
}

//Delete Task

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle reminder
const toggleReminder = async (id) => {
const taskToToggle = await fetchTask(id)
const updTask = { ...taskToToggle, 
  reminder: !taskToToggle.reminder }

const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'PUT', 
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(updTask)
})

const data = await res.json()

  setTasks(
    tasks.map((task) => 
      task.id === id ? 
      { ...task, reminder: data.reminder} : task
    )
  )
}

let MainApp = (props) => {
  return <div>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ?
            (<Tasks 
              tasks={tasks} 
              onDelete={deleteTask}
              onToggle={toggleReminder} />) : 
            ('No tasks to show')}
        </div>}


  return (
  
      <div className="container">
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />
          
          

    <Router>     
          <Routes>
              <Route path='/' element={<MainApp />} /> 
              <Route path='/about' element={<About />} />
          </Routes>
          <Footer />
    </Router>       
      </div>
  
  );

 
}
    export default App;
