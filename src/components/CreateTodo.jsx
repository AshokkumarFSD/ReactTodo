import { useState } from "react"

export default function CreateTodo({handleCreate}) {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");

    // create to do list with empty text validation
    function createTask() {
        const enteredName = taskName.trim();
        const enteredDesc = description.trim();
        if (enteredName !== "" && enteredName.length > 0 && enteredDesc !== "" && enteredDesc.length > 0) {
            handleCreate(enteredName,enteredDesc)
        }
        else {
            alert("Please enter valid name and description")
        }

    }

    return (
        <div className="todo-container">
            <input
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                type="text"
                className="input input-bordered w-full" >
            </input>

            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
                className="input input-bordered w-full" >
            </input>

            <button
                className="btn btn-active btn-accent"
                onClick={() => createTask()}>Create</button>
        </div>
    )
}