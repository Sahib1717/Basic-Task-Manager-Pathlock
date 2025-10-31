// src/App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Card, Container } from "react-bootstrap";

interface Task {
  id?: number;
  title: string;
  description: string;
  isCompleted?: boolean;
}

const API_URL = "https://basic-task-manager-pathlock-3.onrender.com/api/todo";
// const API_URL = "http://localhost:5164/api/todo";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    try {
      const newTask = { title, description };
      const res = await axios.post(API_URL, newTask);
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleMarkComplete = async (id?: number) => {
    if (!id) return;
    try {
      const res = await axios.put(`${API_URL}/${id}/complete`);
      const updated = res.data;

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, isCompleted: updated.isCompleted } : task
        )
      );
    } catch (err) {
      console.error("Error marking complete:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "50px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container style={{ maxWidth: "700px" }}>
        {/* Title */}
        <h1
          className="text-center mb-5"
          style={{
            fontWeight: "700",
            color: "#4a4a4a",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          📝 My To-Do List
        </h1>

        {/* Add Task Form */}
        <Card
          className="mb-4 p-4 shadow-lg"
          style={{
            borderRadius: "15px",
            backgroundColor: "#ffffffcc",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "600", color: "#333" }}>
                Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "600", color: "#333" }}>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{
                borderRadius: "10px",
                padding: "8px 20px",
                fontWeight: "600",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transition: "transform 0.2s, filter 0.2s",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              Add Task
            </Button>
          </Form>
        </Card>

        {/* Task List */}
        {tasks.map(task => (
          <Card
            key={task.id}
            className="mb-3 shadow"
            style={{
              borderRadius: "15px",
              padding: "15px",
              backgroundColor: task.isCompleted ? "#d4edda" : "#ffffff",
              transition: "0.3s, transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontWeight: "700", fontSize: "1.2rem" }}>
                {task.title}{" "}
                {task.isCompleted && (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>✔</span>
                )}
              </Card.Title>
              <Card.Text style={{ color: "#555" }}>{task.description}</Card.Text>
              <div className="d-flex gap-2">
                <Button
                  variant={task.isCompleted ? "secondary" : "success"}
                  size="sm"
                  onClick={() => handleMarkComplete(task.id)}
                  style={{
                    borderRadius: "10px",
                    fontWeight: "600",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s, filter 0.2s",
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  {task.isCompleted ? "Undo" : "Mark Complete"}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                  style={{
                    borderRadius: "10px",
                    fontWeight: "600",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s, filter 0.2s",
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default App;