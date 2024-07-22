const React = require("react");
  
class Footer extends React.Component{
 
    constructor(props){
        super(props);
    }
    getCopyright() {
        return `Copyright © ${new Date().getFullYear()}`;
    }
    render() {
        return <>
            <p>
                Telegram: <a href="https://t.me/NickyParsons">@NickyParsons</a>.
            </p>
            <p>
                {this.getCopyright()}
            </p>
        </>
    }
}
  
export { Footer };