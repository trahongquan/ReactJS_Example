import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import Todolist from "./components/todolist";


function App() {
  // state để lưu biến nội tại // trả về array có 2 đối số
  const [todolist, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const TODO_APP_STORAGE_KEY = 'TODO_APP'

  useEffect( () => {
    const storagedTodolist = localStorage.getItem(TODO_APP_STORAGE_KEY)
    if(storagedTodolist) {
      setTodoList(JSON.parse(storagedTodolist));
    }
  }, [])

  useEffect( () => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todolist));
  }, [todolist])

  // Tạo ra method handlle onchange
  // useCallback dùng để loại bỏ việc reload bị xóa mất data
  const onTextInputChage = useCallback((e) => {
    setTextInput(e.target.value)
  }, []);

const onAddBtnClick = useCallback((e) => {
  // Thêm textInput vào danh sách
  /**
   * do lấy textInput, todolist ở phía ngoài nên cần thêm vào biến depentency 
   * để khi funcion được gọi lại khi giá trị thay đổi
  */
  setTodoList([
    {id: v4(), name: textInput, isCompleted: false},
    ...todolist
    ])
  setTextInput("")
}, [textInput, todolist]);

  const onCheckBtnCheck = useCallback( (id) => {
    setTodoList(prevState => prevState.map(todo => 
      todo.id === id ? { ...todo, isCompleted: true} : todo
      // dấu ... dùng để trả về nguyễn cả biến 
    ))
  }, [])

  return (
      <>
        <h3>Danh sách căn làm</h3>
      <Textfield name="add-todo" placeholder="Thêm việc cần làm..."
      elemAfterInput={
          <Button isDisabled={!textInput} // set giá trị bằng textInput
          appearance="primary" onClick={onAddBtnClick}>
            Thêm
          </Button>
        }
        css={{padding: "4px"}}
        value={textInput}

        onChange={onTextInputChage}
        ></Textfield>
        <Todolist todolist={todolist} onCheckBtnCheck={onCheckBtnCheck}/>
      </>
  )
}

export default App;
