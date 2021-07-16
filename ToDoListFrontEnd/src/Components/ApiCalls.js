import axios from 'axios'
import * as Constants from './Constants'

//Api Method to add the new task to the database
export const addToDo =  newTask =>{
    return axios.post(Constants.getTodoUrl,newTask).then(res=>{
        return res.data
    }).catch(error=>{
        console.log(error)
    });
}

//Api Method to add the Delete the task from the database
export const DeleteToDo = id =>
{
    return axios.delete(Constants.deleteTodoUrl+id+'/',{
        headers: {
          Authorization: Constants.authorizationToken
        }
      } ).then(res=>{
    return res.data
    }).catch(error=>{
        console.log(error)
    });
}

//Api method to update the particular task as done 
export const CompleteToDo = newTask =>
{
    return axios.put(Constants.completeTodoUrl,newTask).then(res=>{
    return res.data
    }).catch(error=>{
        console.log(error)
    });
}

//Fetches all the todo tasks from the database
export const SelectToDo = () => {
return axios.get(Constants.SelectTodoUrl).then(response =>{
   return response
    }).catch(error=>{
        console.log(error)
    });;
}