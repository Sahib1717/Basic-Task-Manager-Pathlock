using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> tasks = new List<TodoItem>();
        private static int nextId = 1;

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TodoItem newTask)
        {
            if (newTask == null || string.IsNullOrEmpty(newTask.Title))
                return BadRequest("Title is required");

            newTask.Id = nextId++;
            newTask.IsCompleted = false;
            tasks.Add(newTask);
            return Ok(newTask);
        }

        [HttpPut("{id}/complete")] // ✅ new route
        public IActionResult MarkComplete(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return NotFound();

            task.IsCompleted = !task.IsCompleted; // toggle complete
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return NotFound();

            tasks.Remove(task);
            return NoContent();
        }
    }
}
