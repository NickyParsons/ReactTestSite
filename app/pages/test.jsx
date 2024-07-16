const React = require("react");
  
class Test extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {message: "This is state"};
    }
    async getData() {
        //let hostString = "http://192.168.1.2:5214";
        let hostString = "http://localhost:5214";
        try {
            let response = await fetch(`${hostString}/test3`, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                console.log(`date: ${await response.text()}`);
            }
            else {
                console.log(response.statusText);
            }
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
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
            <button onClick={this.getData}>TEST FETCH SEE CONSOLE</button>
            </>
    }
}
  
export { Test };