import "./styles.css";
import ShoppingList from "./components/ShoppingList";
import Bag from "./components/Bag";

export default function App() {
  return (
    <>
      <Bag />
      <div className="list-app">
        <ShoppingList />
      </div>
    </>
  );
}