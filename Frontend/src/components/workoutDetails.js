import formatDistanceToNow from 'date-fns/formatDistanceToNow' //this package(date-fns) will help us format our date. and we just imported a function from it
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutDetails({ workout }) {
    // const workouts = props.workouts; //if we passed in props as an argument, we can use this but we just grabbed it directly
    const { user } = useAuthContext()

    const handleDelete = async (id) => {
        if (!user) {
            return
        }
        const response = await fetch("http://localhost:4000/workouts/" + id, {       //we are grabbing the argument we passed in the onClick function and it can be called anythin here...so basically when the button is clicked, it gets the id and sends it here so the backend can identify what we want to delete
            method: "DELETE",
            headers: { "Authorization": `Bearer ${user.token}` }
        })
        console.log(response)
        const json = await response.json()

        if (response.ok) {
            console.log(json)
        }
    }
    return (

        <div className="main">
            {workout.map((workout) => (
                <div className="mt-5 workoutdets" key={workout._id} >
                    <div className="shadow-lg cards p-2">
                        <div className="ms-1">
                            <div className="card-header wt text-danger bg-dark">
                                <b> {workout.title}</b>
                            </div>
                            <b className="card-text">Load: </b>{workout.load} kg <br />
                            <b className="card-text">Reps: </b>{workout.reps} <br />
                            <span> {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                                <button onClick={() => { handleDelete(workout._id) }} className="btn btn-sm btn-danger float-end mb-2 rounded-pill" data-toggle="tooltip" title="delete workout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </button>
                            </span>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
// for the handle delete function, since we want to pass something to it (id), we set it to an arrow function and passs an argument to it
