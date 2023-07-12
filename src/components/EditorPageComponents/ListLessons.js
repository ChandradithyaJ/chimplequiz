import EditLesson from "./EditLesson"

const ListLessons = ({ listOfLessons, setLesson }) => {
    return (
        <>
            {listOfLessons.map(lesson => (
                <EditLesson
                    key={lesson.lessonId}
                    lesson={lesson}
                    setLesson={setLesson}
                />
            ))}
        </>
    )
}

export default ListLessons