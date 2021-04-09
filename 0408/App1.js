import React from 'react';
import ReactDOM from 'react-dom';

function formatDate(date) {
  return date.toLocaleDateString();
}

class Avatar extends React.Component {
  render(){
    return (
      <img
        className="Avatar"
        src={this.props.user.avatarUrl}
        alt={this.props.user.name}
      />
    );
  }
}

class UserInfo extends React.Component {
  render(){
    return (
      <div className="UserInfo">
        <Avatar user={this.props.user} />
        <div className="UserInfo-name">{this.props.user.name}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render(){
    return (
      <div className="Comment">
        <UserInfo user={this.props.author} />
        <div className="Comment-text">{this.props.text}</div>
        <div className="Comment-date">
          {formatDate(this.props.date)}
        </div>
      </div>
    );
  }
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};

ReactDOM.render(<App date={comment.date} text={comment.text} author={comment.author} />, document.getElementById('root'));
export default {App}
