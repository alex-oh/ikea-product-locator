import "./App.css";
import "./index.css";
import Home from "./pages/home";
import githubIcon from "./assets/icons/github-mark.png";

const githubUrl = "https://github.com/alex-oh/ikea-product-locator";

function App() {
    return (
        <div className="App">
            <Home />
            <footer>
                © 2024 Alex Oh
                <a href={githubUrl}>
                    <img src={githubIcon} className="github-icon" />
                </a>
            </footer>
        </div>
    );
}

export default App;
