const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => {
                return <Part key={part.id} part={part} />
            })}
        </div>
    )
}

const Course = ({ course }) => {

    return(
        <>
            <h1>Web development curriculum</h1>
            {course.map((cours) => {

                const total = cours.parts.reduce((sum, part) => {
                    return sum + part.exercises;
                }, 0);

                return (
                    <div key={cours.id}>
                        <Header course={cours.name} />
                        <Content parts={cours.parts} />
                        <b>total of {total} exercises</b>
                    </div>
                )
            })}
        </>
    )
}

export default Course;