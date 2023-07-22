import Header from './components/Header'
import LoginPage from './components/LoginPage'
import ChimpleQuizzes from './components/ChimpleQuizzes'
import HomePage from './components/HomePage'
import LessonsList from './components/LessonsList'
import QuizEditorPage from './components/QuizEditorPage'
import NewLesson from './components/EditorPageComponents/NewLesson'
import AddQuestion from './components/EditorPageComponents/AddQuestion'
import LessonEditor from './components/EditorPageComponents/LessonEditor'
import EditQuestionDetails from './components/EditorPageComponents/EditQuestionDetails'
import ChangeLessonTitle from './components/EditorPageComponents/ChangeLessonTitle'
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
import { db } from './config/firebase'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  // check if autheticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // user score
  const [score, setScore] = useState(0)

  // locally store all the lessons
  const [listOfLessons, setListOfLessons] = useState([])

  // current lesson to display/modify
  const [lesson, setLesson] = useState({})

  // auth.currentUser's name
  const [username, setUsername] = useState("")

  // locally store all the games
  const [listOfGames, setListOfGames] = useState([])

  // current game's id
  const [gameId, setGameId] = useState('')

  // shareable game link
  const [quizLink, setQuizLink] = useState('')

  // list of players in the current game
  const [players, setPlayers] = useState([])

  // user quiz history
  const [history, setHistory] = useState([])

  // temporary states for creating/updating lessons
  const [lessonName, setLessonName] = useState('')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState(null)
  
  // get databases
  const lessonsCollectionRef = collection(db, "lessons")
  const gamesCollectionRef = collection(db, "games")

  useEffect(() => {
    // get list of lessons
    const getLessons = async () => {
      try {
        console.log('fetch lessons')
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
  }, [])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log('fetch games')
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
  }, [])

  return (
    <div className="App">
      <Header />
      <ChimpleQuizzes />

      {/* allow access only after login */}

      {!isAuthenticated &&
        <Routes>
          <Route
            exact path='/login'
            element={<LoginPage 
              setUsername={setUsername}
              setIsAuthenticated={setIsAuthenticated}
            />}
          />
          <Route
            path='*'
            element={<Navigate to='/login' replace />}
          />
        </Routes>
      }
      {isAuthenticated && 
        <Routes>
          <Route
            exact path='/home'
            element={<HomePage
              username={username}
              setUsername={setUsername}
              setIsAuthenticated={setIsAuthenticated}
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
            exact path={'/lessons/join-quiz-confirmation'}
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
            />}
          />
          <Route
            exact path='/editor'
            element={<QuizEditorPage 
              listOfLessons={listOfLessons}
              setLesson={setLesson}
            />}
          />
          <Route 
            exact path='/editor/add-new-lesson'
            element={<NewLesson
              listOfLessons={listOfLessons}
              setListOfLessons={setListOfLessons}
              lesson={lesson}
              setLesson={setLesson}
              lessonName={lessonName}
              setLessonName={setLessonName}
            />}
          />
          <Route 
            exact path={`/editor/${lesson.routeName}-add-questions`}
            element={<AddQuestion 
              lesson={lesson}
              listOfLessons={listOfLessons}
              setListOfLessons={setListOfLessons}
              question={question}
              setQuestion={setQuestion}
              options={options}
              setOptions={setOptions}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
            />}
          />
          <Route
            exact path={`/editor/${lesson.routeName}`}
            element={<LessonEditor 
              lesson={lesson}
              listOfLessons={listOfLessons}
              setListOfLessons={setListOfLessons}
              setQuestion={setQuestion}
              setOptions={setOptions}
              setCorrectAnswer={setCorrectAnswer}
            />}
          />
          <Route 
            exact path={`/editor/${lesson.routeName}-change-lesson-title`}
            element={<ChangeLessonTitle 
              lesson={lesson}
              listOfLessons={listOfLessons}
              setListOfLessons={setListOfLessons}
              lessonName={lessonName}
              setLessonName={setLessonName}
            />}
          /> 
          <Route 
            exact path={`/editor/${lesson.routeName}/:id`}
            element={<EditQuestionDetails 
              lesson={lesson}
              listOfLessons={listOfLessons}
              setListOfLessons={setListOfLessons}
              options={options}
              setOptions={setOptions}
              question={question}
              setQuestion={setQuestion}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
            />}
          />
          <Route
            exact path='/history'
            element={<HistoryPage 
              history={history}
              setHistory={setHistory}
              gamesCollectionRef={gamesCollectionRef}
              listOfLessons={listOfLessons}
              listOfGames={listOfGames}
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
