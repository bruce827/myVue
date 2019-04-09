var xhr = new XMLHttpRequest();
xhr.open('GET',url);
xhr.responseType = 'json';
xhr.onload = function(){
    console.log(xhr.response);  
};
xhr.onerror = function(){
    console.log('查询失败');
};
xhr.send();

// ajax
var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(request.readyState ===4 ){
        console.log("请求成功");
        if(request.readyState === 200){
            console.log(request.responseText);
        }else{
            console.log(request.status);
        }
    }else{
        console.log("等待中....");
    }
}
request.open('GET',exampleUrl);
request.send();

// fetch
function getFetch(url){
    return fetch(url)
        .then(response => response.text())
        .then(text =>{
            console.log(text);
        } ).catch(
            err => {
                console.log('请求失败');
            }
        );
}

// ES7
async function getAsyFetch(url){
    try{
        const response = await fetch(url);
        console.log(await response.text());
    }catch(err){
        console.log('请求失败：',err );
    }
}

import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor () {
      super()
      this.state = { data: null }
    }

    componentWillMount () {
      let data = localStorage.getItem(name)
      this.setState({ data })
    }

    render () {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}



import React from 'react'
import { Badge } from '@ant-design/react-native'
import style from './style'

// type = circle
export default (props) => {
  const { styles = {}, type = null, text, ...badgeProps } = props
  let styleTextDom = Object.assign({}, style.textDom)
  let styleText = Object.assign({}, style.text)
  if (type === 'circle') {
    styleTextDom = Object.assign({}, style.textDom, style.textDomSky)
    styleText = Object.assign({}, style.text, style.textSky)
  }
  return (
    <Badge {...badgeProps} styles={{ ...style, ...styles, textDom: styleTextDom, text: styleText }} text={text} />
  )
}
