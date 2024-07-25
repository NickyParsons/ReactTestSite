const React = require("react");
  
class NotFound extends React.Component{
 
    constructor(props){
        super(props);
    } 
    render() {
        return <h3>Component not found!</h3>   
    }
}
  
export { NotFound }