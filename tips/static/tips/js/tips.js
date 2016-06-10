'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TipOfDay = function (_React$Component) {
  _inherits(TipOfDay, _React$Component);

  function TipOfDay(props) {
    _classCallCheck(this, TipOfDay);

    // Operations usually carried out in componentWillMount go here

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TipOfDay).call(this, props));

    _this.state = {
      data: null
    };
    _this.getCurrentTip();
    return _this;
  }

  _createClass(TipOfDay, [{
    key: 'getCurrentTip',
    value: function getCurrentTip() {
      var _this2 = this;

      $.getJSON(TIPS_URL_ROOT + 'get_current_tip/', function (data) {
        return _this2.setState({ data: data });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.data) {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h1',
            null,
            this.state.data.title
          ),
          React.createElement(
            'div',
            null,
            this.state.data.text
          )
        );
      } else {
        return React.createElement('span', null);
      }
    }
  }]);

  return TipOfDay;
}(React.Component);

ReactDOM.render(React.createElement(TipOfDay, null), document.getElementById('tip_of_day_container'));