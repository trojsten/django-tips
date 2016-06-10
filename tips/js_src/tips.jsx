class TipOfDay extends React.Component {
  render() {
    return <div className="tip_of_day">
      <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h1 className="tip_of_day_title">{this.props.title}</h1>
      <div className="tip_of_day_text">{this.props.text}</div>
      <div className="tip_of_day_controls"><a href="#" className="btn btn-link" onClick={this.props.onNext}>Next tip &raquo; </a></div>
    </div>
  }
}

class TipOfDayApp extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      data: null
    }
    this.getCurrentTip()
  }

  getCurrentTip() {
    $.getJSON(`${TIPS_URL_ROOT}get_current_tip/`, data => this.setState({data: data}))
  }

  markRead(id, callback) {
    // $.getJSON(`${TIPS_URL_ROOT}mark_tip_as_read/${id}`, data => this.setState({data: data}))
    callback()
  }

  handleNext(event) {
    this.markRead(this.state.data.id, () =>
      this.getCurrentTip()
    );
  }

  render() {
    if (this.state.data) {
      return <TipOfDay title={this.state.data.title} text={this.state.data.text} onNext={this.handleNext.bind(this)}/>
    } else {
      return <span>Loading...</span>
    }
  }
}

ReactDOM.render(<TipOfDayApp/>, document.getElementById('tip_of_day_container'))
