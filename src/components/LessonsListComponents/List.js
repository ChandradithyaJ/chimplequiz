import Lesson from "./Lesson"

const List = ({ listOfLessons, setLesson, setScore, gameId }) => {
    return(
        <>
            {listOfLessons.map(lesson => (
                <Lesson 
                    key={lesson.lessonId} 
                    lesson={lesson}
                    setLesson={setLesson}
                    setScore={setScore}
                    gameId={gameId}
                />
            ))}
        </>
    )
}

export default List