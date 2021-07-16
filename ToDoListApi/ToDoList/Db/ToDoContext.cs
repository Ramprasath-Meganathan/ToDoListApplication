using System;
using Microsoft.EntityFrameworkCore;

namespace ToDoList.Db
{
    //Db context table for storing the items in the entity framework database
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {

        }

        public DbSet<ToDoItem> TodoItems { get; set; }
    }
}
