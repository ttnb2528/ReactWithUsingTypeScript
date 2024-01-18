import React from "react";
import {
  useState,
  useReducer,
  createContext,
  useContext,
  useMemo
} from "react";

// define interface properties
interface MyButtonProps {
  title: String;

  disabled: boolean;
}

function MyButton({ title }: { title: string }) {
  return <button>{title}</button>;
}

function MyButton2({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

function MyButton3({ title }: MyButtonProps) {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <button disabled={enabled} onClick={() => setEnabled(!enabled)}>
      {title}
    </button>
  );
}

interface State {
  count: number;
}

// group type and define properties
type CounterAction =
  | { type: "reset" }
  // State["count"] has the purpose of accessing the State interface with prop "count"
  | { type: "setCount"; value: State["count"] };

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

function Counter() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

type theme = "light" | "dark" | "system";
const ThemeContext = createContext<theme>("system");

const getRandomTheme = (theme: theme[]) => {
  const index = Math.floor(Math.random() * theme.length);
  return theme[index];
};

const useGetTheme = () => useContext(ThemeContext);

function Theme() {
  const [theme, setTheme] = useState<theme>("light");

  // useEffect(() => {
  //   handleChangeTheme();
  // })

  const handleChangeTheme = () => {
    setTheme(() => {
      if (
        document.body.contains(document.querySelector(".light")) ||
        document.body.contains(document.querySelector(".dark")) ||
        document.body.contains(document.querySelector(".system"))
      ) {
        document.body.classList.remove("light", "dark", "system");
      }
      const theme = getRandomTheme(["light", "dark", "system"]);
      document.body.classList.add(theme);
      return theme;
    });
  };

  return (
    <ThemeContext.Provider value={theme}>
      <RenderTheme changeTheme={handleChangeTheme} />
    </ThemeContext.Provider>
  );
}

function RenderTheme({ changeTheme }) {
  const theme = useGetTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={changeTheme}>Change Random Theme</button>
    </div>
  );
}

type ComplexObject = {
  kind: String
}

// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);

const useGetComplexObject = () => {
  const object = useContext(Context);
  if(!object) {throw new Error("useGetComplexObject must be used within a Provider")};
  return object;
}

const MyObjectComplex = () => {
  const object = useMemo(() => ({kind: "complex"}), []);

  return (
    <Context.Provider value={object}>
      <MyComponentComplexObject />
    </Context.Provider>
  )
}

const MyComponentComplexObject = () => {
  const object = useGetComplexObject();

  return (
    <div>
      <p>Current object: {object.kind}</p>
    </div>
  )
}

export { MyButtonProps, MyButton, MyButton2, MyButton3, Counter, Theme, MyObjectComplex };
