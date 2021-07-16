namespace ToDoList
{
    //created model class for ToDo items
    public class ToDoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
