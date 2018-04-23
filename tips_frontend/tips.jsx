import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cookie from 'cookie';

const csrfcookie = cookie.parse(document.cookie)['csrftoken'];

if (csrfcookie) {
  axios.defaults.headers.post['X-CSRFToken'] = csrfcookie;
}

class TipOfDay extends React.Component {
  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.props.onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {this.props.title}
        </div>
        <div
          className="panel-body"
          dangerouslySetInnerHTML={{__html: this.props.text}}
        />
        <div
          className="panel-footer tip-of-day-controls"
          style={{textAlign: 'right'}}
        >
          <a href="#" onClick={this.props.onNext}>
            {TIPS_TEXT_NEXT} &raquo;
          </a>
        </div>
      </div>
    );
  }
}

const setCookie = (cookieName, cookieValue, expirationDays) => {
  const d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  document.cookie = `${cookieName}=${cookieValue}; expires=${d.toUTCString()}`;
}

const getCookie = (cookieName) => (
  cookie.parse(document.cookie || '')[cookieName] || ''
);

class TipOfDayApp extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      data: null,
    };
    if (getCookie('tip_of_day') !== 'closed') {
      this.getCurrentTip();
    }
  }

  getCurrentTip = () => {
    return axios
      .get(`${TIPS_URL_ROOT}get_current_tip/`)
      .then(({data}) => this.setState({data}))
      .catch(() => this.setState({data: null}));
  }

  markRead = (id, callback) => {
    return axios
      .post(`${TIPS_URL_ROOT}mark_tip_as_read/${id}`)
      .catch((error) => console.error('Mark as read failed.\n', error));
  }

  handleNext = (event) => {
    this.markRead(this.state.data.id)
      .then(() => this.getCurrentTip())
      .catch((error) => console.error('Get new current tip failed.\n', error));
  }

  handleClose = (event) => {
    this.markRead(this.state.data.id)
      .then(() => this.setState({data: null}));
    setCookie('tip_of_day', 'closed', 1);
  }

  render() {
    return (
      this.state.data
        ? (
          <TipOfDay
            title={this.state.data.title}
            text={this.state.data.rendered_text}
            onNext={this.handleNext}
            onClose={this.handleClose}
          />
        ) : <span />
    );
  }
}

ReactDOM.render(
  <TipOfDayApp />,
  document.getElementById('tip_of_day_container')
);
