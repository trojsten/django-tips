import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TipOfDay extends React.Component {
  render() {
    return <div className="panel panel-info">
      <div className="panel-heading">
        <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}><span aria-hidden="true">&times;</span></button>
        {this.props.title}
      </div>
      <div className="panel-body"  dangerouslySetInnerHTML={{__html: this.props.text}}>
      </div>
      <div className="panel-footer tip-of-day-controls">
          <a href="#" onClick={this.props.onNext}>{TIPS_TEXT_NEXT} &raquo; </a>
      </div>
    </div>
  }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

class TipOfDayApp extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      data: null
    }
    if (getCookie('tip_of_day') != 'closed') {
      this.getCurrentTip()
    }
  }

  getCurrentTip() {
    axios
      .get(`${TIPS_URL_ROOT}get_current_tip/`)
      .then((data) => this.setState({data}))
      .catch(() => this.setState({data: null}));
  }

  markRead(id, callback) {
    axios
      .post(`${TIPS_URL_ROOT}mark_tip_as_read/${id}`)
      .then(() => callback())
      .catch(() => console.warn('Mark as read failed'));
  }

  handleNext(event) {
    this.markRead(this.state.data.id, () => this.getCurrentTip())
  }

  handleClose(event) {
    this.markRead(this.state.data.id)
    this.setState({data: null})
    setCookie('tip_of_day', 'closed', 1)
  }

  render() {
    if (this.state.data) {
      return <TipOfDay title={this.state.data.title} text={this.state.data.rendered_text} onNext={this.handleNext.bind(this)} onClose={this.handleClose.bind(this)}/>
    } else {
      return <span/>
    }
  }
}

ReactDOM.render(<TipOfDayApp/>, document.getElementById('tip_of_day_container'))
