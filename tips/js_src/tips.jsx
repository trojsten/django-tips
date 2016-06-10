class TipOfDay extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      data: null
    }
    this.getCurrentTip()
  }

  getCurrentTip() {
    $.getJSON(TIPS_URL_ROOT + 'get_current_tip/', (data) => this.setState({data: data}))
  }

  render() {
    if (this.state.data) {
      return <div>
        <h1>{this.state.data.title}</h1>
        <div>{this.state.data.text}</div>
        </div>
    } else {
      return <span/>
    }
  }
}

ReactDOM.render(<TipOfDay/>, document.getElementById('tip_of_day_container'))
