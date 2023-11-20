import React, { useState } from "react";
import "./App.css";
import { taskStruct } from "./models";
import AddTaskFeild from "./components/AddTaskFeild/AddTaskFeild";
import SingleTask from "./components/SingleTask/SingleTask";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [Tasks, setTasks] = useState<taskStruct[]>([]);
  const AddNewTaskFunc = (newTask: taskStruct): void => {
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTaskFunc = (taskId: number): void => {
    setTasks((prev) => [...prev.filter((task) => task.id !== taskId)]);
  };

  const handleEditTask = (taskText: string, taskId: number) => {
    setTasks(
      Tasks.map((task) =>
        task.id === taskId ? { ...task, text: taskText } : task
      )
    );
  };
  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;

    if (destination.droppableId !== source.droppableId) {
      setTasks((prev) =>
        prev.map((task) => {
          return task.id === +draggableId
            ? { ...task, completed: !task.completed }
            : task;
        })
      );
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">TASKFY</h1>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="Container">
          <AddTaskFeild AddNewTaskFunc={AddNewTaskFunc} />
          <h1 className="title">
            {Tasks.length ? `Tasks: ${Tasks.length}` : "There are no task"}
          </h1>
          <div className="tasksContainer">
            <Droppable droppableId="activeTasks">
              {(provided, snapshot) => {
                return (
                  <div
                    className={`activeTasks ${
                      snapshot.isDraggingOver ? "dragactive" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <span className="title">Active Tasks</span>
                    {Tasks.map((taskData, index) => {
                      return (
                        !taskData.completed && (
                          <SingleTask
                            index={index}
                            {...taskData}
                            key={taskData.id}
                            removeTaskFunc={removeTaskFunc}
                            handleEditTask={handleEditTask}
                          />
                        )
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>

            <Droppable droppableId="completedTasks">
              {(provided, snapshot) => {
                console.log("Rendering completed Droppable");

                return (
                  <div
                    className={`complitedTasks ${
                      snapshot.isDraggingOver ? "dragcomplete" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <span className="title">Completed Tasks</span>

                    {Tasks.map((taskData, index) => {
                      return (
                        taskData.completed && (
                          <SingleTask
                            index={index}
                            {...taskData}
                            key={taskData.id}
                            removeTaskFunc={removeTaskFunc}
                            handleEditTask={handleEditTask}
                          />
                        )
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </main>
      </DragDropContext>
    </div>
  );
};

export default App;
