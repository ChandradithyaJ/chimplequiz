import Header from './components/Header'
import LoginPage from './components/LoginPage'
import ChimpleQuizzes from './components/ChimpleQuizzes'
import HomePage from './components/HomePage'
import LessonsList from './components/LessonsList'
import QuizEditor from './components/QuizEditor'
import HistoryPage from './components/HistoryPage'
import WaitingRoom from './components/WaitingRoom'
import JoinQuizConfirmation from './components/JoinQuizConfirmation'
import Question from './components/Question'
import Result from './components/Result'
import './css/Header.css'
import './css/Login.css'
import './css/Home.css'
import './css/LessonsList.css'
import './css/Editor.css'
import './css/History.css'
import './css/WaitingRoom.css'
import './css/Question.css'
import './css/Result.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { db, auth } from './config/firebase'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [score, setScore] = useState(0)
  const [listOfLessons, setListOfLessons] = useState([])
  const [lesson, setLesson] = useState({})
  const [username, setUsername] = useState("")
  const [listOfGames, setListOfGames] = useState([])
  const [gameId, setGameId] = useState('')
  const [quizLink, setQuizLink] = useState('')
  const [players, setPlayers] = useState([])
  const [history, setHistory] = useState([])
  
  // get databases
  const lessonsCollectionRef = collection(db, "lessons")
  const gamesCollectionRef = collection(db, "games")

  useEffect(() => {
    // get list of lessons
    const getLessons = async () => {
      try {
        const Lessons = await getDocs(lessonsCollectionRef)
        const data = Lessons.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setListOfLessons(data)
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }

    getLessons()
  }, [lessonsCollectionRef, listOfLessons])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // read in all game data
        const Games = await getDocs(gamesCollectionRef)
        const gamesData = Games.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setListOfGames(gamesData)
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchGames()
  }, [listOfGames, gamesCollectionRef])

  return (
    <div className="App">
      <Header />
      <ChimpleQuizzes />

      {/* allow access only after login */}

      {!auth.currentUser &&
        <Routes>
          <Route
            exact path='/login'
            element={<LoginPage 
              setUsername={setUsername}
            />}
          />
          <Route
            path='*'
            element={<Navigate to='/login' replace />}
          />
        </Routes>
      }
      {auth.currentUser && 
        <Routes>
          <Route
            exact path='/home'
            element={<HomePage
              username={username}
              setUsername={setUsername}
              setGameId={setGameId}
            />}
          />
          <Route
            exact path='/lessons'
            element={<LessonsList
              listOfLessons={listOfLessons}
              lesson={lesson}
              setLesson={setLesson}
              setScore={setScore}
              setGameId={setGameId}
              quizLink={quizLink}
              setQuizLink={setQuizLink}
            />}
          />
          <Route
            exact path={`/lessons/join-quiz-confirmation`}
            element={<JoinQuizConfirmation
              lesson={lesson}
              gameId={gameId}
              listOfGames={listOfGames}
              />}
          />
          <Route
            exact path={`/lessons/${lesson.routeName}-quiz-waiting-room`} element={<WaitingRoom
              lesson={lesson}
              setScore={setScore}
              gameId={gameId}
              gamesCollectionRef={gamesCollectionRef}
              listOfGames={listOfGames}
              setListOfGames={setListOfGames}
            />}
          />
          <Route
            exact path={`/lessons/${lesson.routeName}-quiz`}
            element={<Question
              lesson={lesson}
              score={score}
              setScore={setScore}
              gameId={gameId}
              listOfGames={listOfGames}
              setPlayers={setPlayers}
            />}
          />
          <Route
            exact path={`/lessons/${lesson.routeName}-quiz-results`}
            element={<Result
              setScore={setScore}
              players={players}
              setPlayers={setPlayers}
              gameId={gameId}
              gamesCollectionRef={gamesCollectionRef}
              setListOfGames={setListOfGames}
            />}
          />
          <Route
            exact path='/editor'
            element={<QuizEditor />}
          />
          <Route
            exact path='/history'
            element={<HistoryPage 
              history={history}
              setHistory={setHistory}
              gamesCollectionRef={gamesCollectionRef}
              listOfLessons={listOfLessons}
              setListOfGames={setListOfGames}
            />}
          />
          <Route
            path='*'
            element={<Navigate to='/home' />}
          />
        </Routes>
      }
    </div>
  );
}

export default App;
