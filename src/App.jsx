import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import ListComponent from './components/ListDisplay'

function App() {

  const [alltoDoList,setAllTodoList] = useState([]);
  const [displayTodo,setDisplayTodo] = useState([]);
  const [selectedOption,setSelectedOption] = useState("All");

  // Create a todo List item
  function addToDo(taskName,taskDescription)
  {
    const getSize = alltoDoList.length;
    const newToDo = {
      taskName,
      description:taskDescription,
      id:getSize+1,
      status:"Not Completed"
    }
    setAllTodoList([...alltoDoList,newToDo])
  }

  //Update todo List item
  function updatedItem(updateItem)
  {
    const newListItem = [];
    for(let idx in alltoDoList)
    {
      const item = alltoDoList[idx];
      if(item.id !== updateItem.id)
      {
        newListItem.push(item)
      }
      else{
        newListItem.push(updateItem);
      }
    }
    setAllTodoList(newListItem)
  }

// delete a todo List item  
  function deleteItem(selectedItem)
  {
    const newListItem = [];
    for(let idx in alltoDoList)
    {
      const item = alltoDoList[idx];
      if(item.id !== selectedItem.id)
      {
        newListItem.push(item)
      }
    }
    setAllTodoList(newListItem);
  }

  useEffect(()=>{
    selectedOptionUpdate(selectedOption,true)
  },[alltoDoList])

  function selectedOptionUpdate(option,fromRefresh = false)
  {
    if(!fromRefresh)
    {
      setSelectedOption(option);
    }
    if(option == "All")
    {
      setDisplayTodo(alltoDoList)
    }
    else{
      const newListItem = [];
      for(let idx in alltoDoList)
      {
        const item = alltoDoList[idx];
        if(item.status === option)
        {
          newListItem.push(item)
        }
      }
      setDisplayTodo(newListItem);
    }
  }

  // display all the component 
  // display todoList item form the array
  return (
    <>
      <div>
        <h2 className='title'>My Todo</h2>
        <CreateTodo handleCreate={addToDo}></CreateTodo>
        <ListComponent toDoList={displayTodo}
          updatedItem={updatedItem} deleteItem={deleteItem}
          selectedOption={selectedOptionUpdate}></ListComponent>
      </div>
    </>
  )
}

export default App
