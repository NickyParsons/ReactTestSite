const ReactDOM = require("react-dom/client");
const React = require("react");
const Test = require("./components/test.jsx");
const Counter = require("./components/counter.jsx");
  
const text="Asshole";
  
ReactDOM.createRoot(
    document.getElementById("pageContent")
)
.render(
    <div>
        <h2>React APP</h2>
        <Test content={text} />
        <Counter count={7}/>
    </div>
);