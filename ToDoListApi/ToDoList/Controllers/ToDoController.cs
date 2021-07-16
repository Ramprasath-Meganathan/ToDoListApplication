using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Db;

/*controller method created to test the crud api calls of todo list*/
namespace ToDoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        //created for connecting to DB
        private readonly ToDoContext _context;

        public ToDoController(ToDoContext context)
        {
            _context = context;
        }

        #region api calls to trest the crud api calls of todo list*/
        //Get method to fetch the list of ToDo items in the database
        //Get api/ToDo/
        [HttpGet]
        public async Task<ActionResult<List<ToDoItem>>> GetToDoList()
        {
            List<ToDoItem> result = new List<ToDoItem>();
            try
            {
                result = await _context.TodoItems
                 .Select(x => x).ToListAsync(); 
            }
            catch(Exception ex)
            {
                return NotFound(ex.StackTrace); //returns in case of exceptions
            }
            return Ok(result); //returns the result

        }

        //Gets the ToDo item based on a ID
        //Get api/ToDo/id
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(long id)
        {
            var result = await _context.TodoItems.FindAsync(id); //checks if the id is already present in the database
            if(result == null)
            {
                return NotFound();
            }
            return Ok(result); //returns the response if valid
        }


        //Post the ToDo item to the database
        // POST: api/ToDo
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostTodoItem([FromBody]ToDoItem todoItem)
        {
            ActionResult<ToDoItem> result = null;
            try
            {
                if (!CheckIfTaskExists(todoItem.Name)) //checks if the item is already present in the database
                {
                    _context.TodoItems.Add(todoItem);
                    await _context.SaveChangesAsync(); //saves changes

                    result = CreatedAtAction(nameof(GetToDoItem), new { id = todoItem.Id }, todoItem);
                    if (result == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return NoContent(); //returns response if task already exists
                }
            }
           
            catch(Exception ex)
            {
                return NotFound(ex.StackTrace); 
            }
            return result;
          
        }

        //Deletes the ToDo item based on a ID
        //Delete api/ToDo/id
        [HttpDelete("{id:int}")]
        public IActionResult DeleteToDoItem(long id)
        {
            //checks if the value is valid
            var result =  _context.TodoItems.Where(x=>x.Id ==id).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                //removes the result from the in memory database
                _context.TodoItems.Remove(result); 
                _context.SaveChanges();
            }
            return Ok(result); //returns a valid response
        }

        //Updates the ToDo item task to done based on the todo item passed
        //Put api/Todo/
        [HttpPut]
        public async Task<IActionResult> PutTodoItem([FromBody]ToDoItem todoItem)
        {
            try
            {
                _context.Entry(todoItem).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(todoItem.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        #endregion

        #region private helper methods created for checking if the item exists
        private bool TodoItemExists(long id)
        {
            //checks if the if the todo item id already exists 
            var result = _context.TodoItems.Where(x => x.Id == id).FirstOrDefault();
            if (result != null)
            {
                return true;
            }
            return false;
        }


        private bool CheckIfTaskExists(string name)
        {
            //checks if the if the todo item name already exists 
            var result = _context.TodoItems.Where(x=>x.Name.ToLower()==name.ToLower()).FirstOrDefault();
            if(result!=null)
            {
                return true;
            }
            return false;
        }
        #endregion
    }
}
