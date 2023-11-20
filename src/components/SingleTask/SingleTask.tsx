import React, { LegacyRef, MutableRefObject, useRef, useState } from "react";
import "./TaskStyle.css";
import { taskStruct } from "../../models";
import { Draggable } from "react-beautiful-dnd";
interface props extends taskStruct {
  removeTaskFunc: (taskId: number) => void;
  handleEditTask: (taskText: string, taskId: number) => void;
  index: number;
}
const SingleTask: React.FC<props> = ({
  text,
  id,
  index,
  completed,
  removeTaskFunc,

  handleEditTask,
}) => {
  const [TaskText, setTaskText] = useState(text);
  const [activeInput, setactiveInput] = useState<boolean>(false);
  const inputref = useRef<HTMLInputElement>(null);
  function handlChangeTaskText(e: React.ChangeEvent<HTMLInputElement>): void {
    setTaskText(e.target.value);
  }
  const EditTaskFunc = (event: { key: string }) => {
    if (event.key === "Enter") {
      setactiveInput(false);
      if (TaskText === text) {
        console.log("no Change applayed");
      } else {
        console.log(" Changes applayed");
        handleEditTask(TaskText, id);
      }
    }
  };
  const handleBlur = () => {
    setactiveInput(false);
    if (TaskText === text) {
      console.log("no Change applayed");
    } else {
      console.log(" Changes applayed");
      handleEditTask(TaskText, id);
    }
  };

  const inputFoucs = () => {
    setactiveInput(true);
    inputref.current?.focus();
  };

  return (
    <Draggable key={index} draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          className={`taskContainer ${completed && "complete"}`}
          id={id.toString()}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="col">
            <input
              type="text"
              name="text"
              className="text"
              value={TaskText}
              disabled={completed || !activeInput}
              ref={inputref}
              onChange={(e) => handlChangeTaskText(e)}
              onKeyDown={EditTaskFunc}
              onBlur={handleBlur}
            />
          </div>
          <div className="col">
            {!completed && (
              <span
                role="button"
                onClick={() => inputFoucs()}
                title="Edit Task"
              >
                ✏️
              </span>
            )}
            <span role="button">{completed && "✔️"}</span>
            <span
              role="button"
              onClick={() => removeTaskFunc(id)}
              title="Delete Task"
            >
              🧺
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTask;
