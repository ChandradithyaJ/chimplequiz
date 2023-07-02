import Lesson from "./Lesson"

const List = ({ listOfLessons, setLesson, setScore }) => {
    return(
        <>
            {listOfLessons.map(lesson => (
                <Lesson 
                    key={lesson.lessonId} 
                    lesson={lesson}
                    setLesson={setLesson}
                    setScore={setScore}
                />
            ))}
        </>
    )
}

export default List