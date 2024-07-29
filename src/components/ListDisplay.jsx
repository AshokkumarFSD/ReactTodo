import { useState } from "react"

//To dispaly the filter and todo list item
export default function ListComponent({ toDoList,updatedItem,deleteItem,selectedOption }) {

    function onFilterSelected(option)
    {
        //update selected option
        selectedOption(option);
    }

    return (<div>
        <Filter onFilterSelected={onFilterSelected}></Filter>
        <div className="product_coordinator">
            {
                toDoList.length > 0 &&
                toDoList.map((val) => (
                    <ToDoItem toDoItem={val} key={val.id} updatedItem={updatedItem} deleteItem={deleteItem}></ToDoItem>
                ))
            }
        </div>
    </div>)

}

//displaying the todo item
function ToDoItem({ toDoItem, updatedItem ,deleteItem}) {
    const [selectedOption, setSelectedOption] = useState(toDoItem.status);

    const [itemClass,setItemClass] = useState(toDoItem.status =="Completed" ? "filter-dropdown completed": "filter-dropdown not_completed");

    // update the filter selected option
    const handleFilterChange = (event) => {
        const filter = event.target.value;
        setSelectedOption(filter);
    };

    // handle status edit option
    function handleEdit()
    {
        if(toDoItem.status !== selectedOption)
        {
            toDoItem.status = selectedOption
            if(selectedOption == "Completed")
            {
                setItemClass("filter-dropdown completed");
            }
            else{
                setItemClass("filter-dropdown not_completed");
            }
            updatedItem(toDoItem)
        }
        else{
            alert("Change the status to edit")
        }
    }

    //handle delete option
    function handleDelete()
    {
        deleteItem(toDoItem)
    }

    return (
        <div className="product_container">
            <div className="card-body p-4">
                <div className="text-start">
                    <h5 className="fw-bolder items">Name: {toDoItem.taskName}</h5>
                    <h5 className="items">  Description: {toDoItem.description}</h5>
                    <div className="item_status">
                        <p>Status:</p>
                        <div className="filter-container">
                            <select value={selectedOption} onChange={handleFilterChange} className={itemClass}>
                                <option value="Completed">Completed</option>
                                <option value="Not Completed">Not Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="btn_container">
                <button className="action_btn edit" onClick={handleEdit}>Edit</button>
                <button className="action_btn delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>)
}

// filter drop down component
function Filter({onFilterSelected}) {
    const [selectedOption, setSelectedOption] = useState("All");

    // update selected option
    const handleFilterChange = (event) => {
        const filter = event.target.value;
        setSelectedOption(filter);
        onFilterSelected(filter);
    };

    return (<>
    <div className="filter_row">
        <p>Status Filter:</p>
        <div className="filter-container">
            <select value={selectedOption} onChange={handleFilterChange} className="filter-dropdown">
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
            </select>
        </div>
    </div>
    </>)
}