import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

class User extends Component{
    state = {
        name: "pdt",
        age: 18
    }
    say(x,y){
        console.log(x,y)
    }
    render(){
        var that = this;
        return (
            <div onClick={this.say.bind(that,that.state.name,that.state.age)}>
                点击say
            </div>
        );
    }
}

export default User;