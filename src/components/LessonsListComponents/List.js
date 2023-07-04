import Lesson from "./Lesson"

const List = ({ listOfLessons, setLesson, setScore, setGameId }) => {
    return(
        <>
            {listOfLessons.map(lesson => (
                <Lesson 
                    key={lesson.lessonId} 
                    lesson={lesson}
                    setLesson={setLesson}
                    setScore={setScore}
                    setGameId={setGameId}
                />
            ))}
        </>
    )
}

export default List