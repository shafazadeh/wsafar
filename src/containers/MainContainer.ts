import React from 'react';
import { render } from 'react-dom';
import { Provider, Subscribe, Container } from 'unstated';

type mainState = {
  isLogin:boolean
};
 
class MainContainer extends Container<mainState> {
  readonly state = {
    isLogin:false
   
  };
 
  public setIsLogin(s:boolean){
    this.setState({
      isLogin : s
    });
  }

 
  
}

const container = new MainContainer();

export default container;
