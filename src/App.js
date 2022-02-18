import Header from "./components/Header";
import Content from "./components/Content";
import store from "./store/stores";

function App() {
  return (
    <div className="App">
      <Header />
      <Content store={store} />
    </div>
  );
}

export default App;
