import { ChangeEvent, useState } from "react";
import "./inputStyle.css";
import { taskStruct } from "../../models";
interface props {
  AddNewTaskFunc: (newTask: taskStruct) => void;
}
const AddTaskFeild: React.FC<props> = ({ AddNewTaskFunc }) => {
  const [TaskText, setTaskText] = useState<string>("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (TaskText.length > 3) {
      const newtask: taskStruct = {
        text: TaskText,
        id: Date.now(),
        completed: false,
      };
      AddNewTaskFunc(newtask);
    }
  };

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };
  return (
    <>
      <form className="inputContainer" onSubmit={(e) => handleAddTask(e)}>
        <input
          type="text"
          placeholder="Enter ToDo"
          onChange={(e) => handelChange(e)}
        />
        <button type="submit">Go</button>
      </form>
    </>
  );
};
export default AddTaskFeild;
