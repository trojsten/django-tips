class TipOfDay extends React.Component {
  render() {
    console.log(this.props);
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
    $.getJSON(`${TIPS_URL_ROOT}get_current_tip/`, data => this.setState({data: data})).fail(() => this.setState({data: null}))
  }

  markRead(id, callback) {
    console.log('mark as read')
    $.post(`${TIPS_URL_ROOT}mark_tip_as_read/${id}`, data => {
      if (data && data.status == 'success') {
        if (callback) {
          callback()
        }
      } else {
        console.warn('Mark as read failed');
      }
    })
  }

  handleNext(event) {
    this.markRead(this.state.data.id, () => this.getCurrentTip())
  }

  handleClose(event) {
    this.markRead(this.state.data.id)
    this.setState({data: null})
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
