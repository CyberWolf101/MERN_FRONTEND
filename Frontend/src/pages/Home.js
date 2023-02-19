import { useEffect, useState } from "react"
import WorkoutDetails from "../components/workoutDetails"
import WorkOutForm from "../components/workoutForm"
import { useAuthContext } from "../hooks/useAuthContext"

//so we need to send an authorization header here or the app will crash  so if the user is not logged in, we wouldn't send the request
export default function Home() {
    const [workout, setWorkouts] = useState(null)
    const { user } = useAuthContext()
    useEffect(() => {
        //normally the path is supposed to be http://localhost:4000/workouts but you can't so that in local dev you'll get a CORS error so we add a proxy field to the frontend package.json  at the top and put http://localhost:4000 as the value and then come here and cut it out so it will be referenced there by default then restart both app(frontend and backend) 
        const fetchWorkout = async () => {
            const response = await fetch("https://friendly-cow-stole.cyclic.app",{ // we set the authorization headers property so it can be part of the request
                headers:{"Authorization":`Bearer ${user.token}`}  //we only want the authorization in this case so we set it to the token property we have on the user 
            })
            const json = await response.json()
            if (response.ok) {
                setWorkouts(json)
            }
        }
        if (user) {              //so that we are only fetching workouts if we have a user
            fetchWorkout()
        }
    }, [<WorkOutForm />,user])  //[] so it will only fire once but we added the form an now we want it to refresh with respect to that form so we could either write the element <WorkOutForm/> or leave it in curly braces {WorkOutForm}.it will work so long as you export it
    //or use react context:(
    return (
        <div className="home container-fluid">
            {workout && <WorkoutDetails workout={workout} />}
            <WorkOutForm />
        </div>
    )

}