import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkOutForm = () => {
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState("")
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("You must be logged in!!")
            return                                       //we used the return statement so we wouldn't execute the rest of the code if we don't have a user
        }

        const workout = { title, load, reps }
        const response = await fetch("http://localhost:4000/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",         //headers, not header
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)                          //so the json.error is the error we get back as a response //so we recieved a new form of error from a new code that was added
            console.log(json.error)                                //always call it error abeg
            setEmptyFields(json.emptyFields)              //so basically the json response was 2(error and emptyfields) so we are accepting the empty field response in the empty fields state
        }
        if (response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log("added", json)
        }                                               //SECOND CODE IN REACT BS
    }

    return (
        //so since we are outputting conditionally we use curly braces for js. And we do a tenary operator inside. the tenary operator is basically saying if emptyFields includes "title"(which will happen if it is empty according to the back end) the we apply the first class we named err if not we apply nothing which is eqivalent to an empty string(but we are using a bs class in our case so just form control)
        <div className=" workoutform mt-4">
            <div className="col float-end">
                <h6 className="mt-3 text-danger"><center>Add A New Workout</center></h6>
                <form className="">
                    {/* <label>Excercise Type:</label><br /> */}
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes("title") ? "err form-control" : "form-control"} placeholder="workout type..."></input>
                    <br />

                    {/* <label>Load:</label><br /> */}
                    <input type='number' value={load} onChange={(e) => setLoad(e.target.value)} className={emptyFields.includes("load") ? "err form-control" : "form-control"} placeholder="load.."></input>
                    <br />

                    {/* <label>Reps:</label><br /> */}
                    <input type='number' value={reps} onChange={(e) => setReps(e.target.value)} className={emptyFields.includes("reps") ? "err form-control" : "form-control"} placeholder="reps.."></input>
                    <br />
                   <center>
                   <button onClick={handleSubmit}
                        className="btn btn-danger  rounded-pill "
                        data-toggle="tooltip" title="add workout">
                        Add workout
                    </button>
                   </center>
                </form>
<center>
{error && <div className="errMessage">{error}</div>}

</center>
            </div>
        </div>
    )
}
export default WorkOutForm;