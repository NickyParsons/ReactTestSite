const React = require("react");
  
class Test extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {message: "This is state"};
    }
    componentDidMount() {
        const pageTitle = "Test Page";
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    render() {
        return <>
                <h3>Test Component</h3>
                <p>{this.state.message}</p>
                <p>Props: {this.props.content}</p>
            </>
    }
}
  
export { Test };