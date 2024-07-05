const React = require("react");
  
class Test extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {message: "This is state"};
    } 
    render() {
        return <div>
                <h3>Test Component</h3>
                <p>{this.state.message}</p>
                <p>Props: {this.props.content}</p>
            </div>
    }
}
  
module.exports = Test;