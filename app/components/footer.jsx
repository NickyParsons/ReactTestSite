const React = require("react");
  
class Footer extends React.Component{
 
    constructor(props){
        super(props);
    }
    getCopyright() {
        return `Copyright © ${new Date().getFullYear()}`;
    }
    render() {
        return <footer>
            <h2>FOOTER</h2>
            <div id="footer">
                <p>
                    Telegram: <a className="textLink" href="https://t.me/NickyParsons">@NickyParsons</a>.
                </p>
                <p>
                    {this.getCopyright()}
                </p>
            </div>
        </footer>
    }
}
  
export { Footer };