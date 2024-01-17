import { MyButton, MyButton2, MyButton3, Counter, Theme } from "./MyButton.tsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />

      <br />
      <MyButton2 title="Use disable" disabled={true} />
      <br />
      <MyButton3 title="Use State disable" />

      <Counter />

      <Theme />
    </div>
  );
}

export default App;
