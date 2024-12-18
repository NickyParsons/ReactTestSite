const React = require("react");
  
class Counter extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {count: this.props.count}
        this.addToCounter = this.addToCounter.bind(this);
        this.reduceToCounter = this.reduceToCounter.bind(this);
    }
    componentDidMount() {
        const pageTitle = "Counter Page";
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    testHandler(event){
        console.log(`Кнопка нажата ${event.ctrlKey}`);
    }
    addToCounter(e) {
        if (!e.ctrlKey) {
            this.setState((prevState, props)=>{return {count: prevState.count + 1}});
        }
        else {
            this.setState((prevState, props)=>{return {count: prevState.count + 10}});
        }
    }
    reduceToCounter(e) {
        if (!e.ctrlKey) {
            if(this.state.count > 0){
                this.setState((prevState, props)=>{return {count: prevState.count - 1}});
            }
        }
        else {
            if(this.state.count < 10){
                this.setState({count: 0});
            }
            else{
                this.setState((prevState, props)=>{return {count: prevState.count - 10}});
            }
        }
    }
    render() {
        return <>
            <h3>Counter Component</h3>
            <button id="minus-buuton" className="neon-button" onClick={this.reduceToCounter}>-</button>
            <button id="count-buuton" className="neon-button" onClick={this.testHandler}>{this.state.count}</button>
            <button id="plus-buuton" className="neon-button" onClick={this.addToCounter}>+</button>
        </>
    }
}

Counter.defaultProps = {count: 0}
  
export { Counter };