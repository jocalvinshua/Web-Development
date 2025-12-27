# ⚛️ React Notes

---

## 1. Introduction

React is an **open-source front-end JavaScript library** used to build user interfaces, especially single-page applications.

<aside>

### Key Concepts

- React uses **JSX**, a syntax extension that allows writing HTML-like code inside JavaScript.
- A React component must return **one parent element**.
- To return multiple elements, wrap them inside a `div` or **React Fragment** (`<>...</>`).
</aside>

---

## 2. JSX & Components

A component is a reusable piece of UI.

```jsx
function Hello() {
  return <h1>Hello React</h1>;
}
```

---

## 3. Props

Props are **arguments passed from parent to child components**.

### Important Rules

- Props are **read-only**.
- Data flows **one-way (parent → child)**.
- Child-to-parent communication is done using **callback functions**.

```jsx
// Parent
function App() {
  return <Product name="Laptop" price={1200} />;
}

// Child
function Product({ name, price }) {
  return <h2>{name} - ${price}</h2>;
}
```

### Child to Parent (Callback)

```jsx
function Parent() {
  const handleData = (data) => console.log(data);
  return <Child sendData={handleData} />;
}

function Child({ sendData }) {
  return <button onClick={() => sendData("Hello")}>Send</button>;
}
```

---

## 4. State & Hooks

Hooks allow functional components to manage **state and lifecycle behavior**.

---

### useState

Used to store and update component state.

```jsx
const [count, setCount] = useState(0);
```

### Example: Counter

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### Example: Form Input (Controlled Component)

```jsx
function Form({ onSubmit }) {
  const [name, setName] = useState("");

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => onSubmit(name)}>Submit</button>
    </>
  );
}
```

---

### useEffect

Used to handle **side effects** such as data fetching, subscriptions, and DOM updates.

```jsx
useEffect(() => {
  console.log("Component mounted or updated");
}, []);
```

Dependency behavior:

- `[]` → runs once (mount)
- `[state]` → runs when state changes
- no dependency → runs every render

---

### useContext

Allows sharing data globally without prop drilling.

### When to use

- Theme
- Authentication
- Global settings

```jsx
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

```jsx
const { theme, setTheme } = useContext(ThemeContext);
```

```sql
// In App.jsx
import { ThemeProvider } from './ThemeProvider.jsx' // Assume that Provider in ThemeProvider.jsx

// The other code still same

<ThemeProvider>
  <App />
</ThemeProvider>
```

---

### useRef

Used to access DOM elements or store mutable values without re-rendering.

```jsx
const inputRef = useRef();
inputRef.current.focus();
```

---

### useReducer

Alternative to `useState` for complex state logic.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

---

### useMemo

Optimizes performance by memoizing computed values.

```jsx
const total = useMemo(() => calculateTotal(data), [data]);
```

---

### useCallback

Memoizes functions to avoid unnecessary re-renders.

```jsx
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

---

## 5. Rendering Techniques

### Conditional Rendering

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

---

### List Rendering

```jsx
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```

---

## 6. React Router DOM

React Router is a library for handling navigation in React apps.

### Installation

```bash
npm install react-router-dom
```

---

### Router Setup

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

### Routes & Link

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

```jsx
<Link to="/about">About</Link>
```

---

### useNavigate

Navigate programmatically after an action.

```jsx
const navigate = useNavigate();
navigate("/dashboard");
```

---

### Dynamic Routes (useParams)

```jsx
<Route path="/user/:id" element={<User />} />
```

```jsx
const { id } = useParams();
```

---

## 7. Fetching API Data

```jsx
useEffect(() => {
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

Always handle:

- Loading state
- Error state

---

## 8. Folder Structure Best Practice

```
src/
 ├─ components/
 ├─ pages/
 ├─ hooks/
 ├─ context/
 ├─ services/
 └─ utils/

```

---

## 9. Best Practices

- Keep components small and reusable
- Avoid prop drilling when possible
- Use meaningful names
- Separate logic and UI
- Optimize performance when needed

---
