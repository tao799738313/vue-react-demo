import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import User from  './user';

class App extends Component{
    state = {
       arr : ["山","核","桃"],
        input: "11111"
    }
    onInputChange(e){
        const val = e.target.value;
        this.setState({ "input": val });
    }
    render(){
        return (
            <div className="App">
                <input type="text" value={this.state.input} onChange={this.onInputChange.bind(this)}/>
                <p>{this.state.input}</p>
                <User />
                {
                        this.state.arr.map((obj)=>{
                        return (<div>{obj}</div>)
                        })
                }
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;




