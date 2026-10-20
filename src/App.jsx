
import { useState } from "react";
import {
  HashRouter,
  MemoryRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="demo-page">
      <h3>Home Page</h3>
      <p>Welcome to the Router Types practical.</p>
    </div>
  );
}

function About() {
  return (
    <div className="demo-page">
      <h3>About Page</h3>
      <p>This page demonstrates client-side navigation.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="demo-page">
      <h3>Contact Page</h3>
      <p>You have opened the Contact page.</p>
    </div>
  );
}

function RouterContent({ type }) {
  const location = useLocation();

  return (
    <div className="router-content">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <p className="location">
        Current location: <strong>{location.pathname}</strong>
      </p>

      {type === "HashRouter" && (
        <p className="hint">
          Check the browser URL: the route appears after #.
        </p>
      )}

      {type === "MemoryRouter" && (
        <p className="hint">
          Navigation is stored in memory; the browser URL does not change.
        </p>
      )}
    </div>
  );
}

function HashDemo() {
  return (
    <HashRouter>
      <RouterContent type="HashRouter" />
    </HashRouter>
  );
}

function MemoryDemo() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <RouterContent type="MemoryRouter" />
    </MemoryRouter>
  );
}

function StaticDemo() {
  return (
    <div className="router-content">
      <h3>StaticRouter</h3>
      <p>
        StaticRouter renders a fixed location and is intended for
        server-side rendering (SSR). It is not used as a normal
        browser navigation router.
      </p>
      <pre>
        <code>{`import { StaticRouter } from
  "react-router-dom/server";

<StaticRouter location="/about">
  <Routes>
    <Route path="/about" element={<About />} />
  </Routes>
</StaticRouter>`}</code>
      </pre>
      <p className="hint">
        The code above is a StaticRouter example for server-side rendering.
        Do not import it into this browser demo.
      </p>
    </div>
  );
}

export default function App() {
  const [selectedRouter, setSelectedRouter] = useState("hash");

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">REACT PRACTICAL</p>
        <h1>Router Types</h1>
        <p>
          Explore HashRouter, MemoryRouter, and StaticRouter.
        </p>
      </header>

      <section className="panel">
        <label htmlFor="router-select">Choose a router to explore</label>
        <select
          id="router-select"
          value={selectedRouter}
          onChange={(event) => setSelectedRouter(event.target.value)}
        >
          <option value="hash">HashRouter</option>
          <option value="memory">MemoryRouter</option>
          <option value="static">StaticRouter</option>
        </select>

        {selectedRouter === "hash" && (
          <>
            <h2>HashRouter</h2>
            <p>Uses the URL hash to track the current route.</p>
            <HashDemo />
          </>
        )}

        {selectedRouter === "memory" && (
          <>
            <h2>MemoryRouter</h2>
            <p>Keeps navigation history in memory instead of the URL.</p>
            <MemoryDemo />
          </>
        )}

        {selectedRouter === "static" && (
          <>
            <h2>StaticRouter</h2>
            <StaticDemo />
          </>
        )}
      </section>

      <footer>
        <p>Army Green × Ivory · React Router Demonstration</p>
      </footer>
    </main>
  );
}
