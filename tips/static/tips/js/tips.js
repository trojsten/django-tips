"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TipOfDay = function (_React$Component) {
  _inherits(TipOfDay, _React$Component);

  function TipOfDay() {
    _classCallCheck(this, TipOfDay);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TipOfDay).apply(this, arguments));
  }

  _createClass(TipOfDay, [{
    key: "render",
    value: function render() {
      console.log(this.props);
      return React.createElement(
        "div",
        { className: "panel panel-info" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "button",
            { type: "button", className: "close", "aria-label": "Close", onClick: this.props.onClose },
            React.createElement(
              "span",
              { "aria-hidden": "true" },
              "×"
            )
          ),
          this.props.title
        ),
        React.createElement("div", { className: "panel-body", dangerouslySetInnerHTML: { __html: this.props.text } }),
        React.createElement(
          "div",
          { className: "panel-footer tip-of-day-controls" },
          React.createElement(
            "a",
            { href: "#", onClick: this.props.onNext },
            TIPS_TEXT_NEXT,
            " » "
          )
        )
      );
    }
  }]);

  return TipOfDay;
}(React.Component);

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var TipOfDayApp = function (_React$Component2) {
  _inherits(TipOfDayApp, _React$Component2);

  function TipOfDayApp(props) {
    _classCallCheck(this, TipOfDayApp);

    // Operations usually carried out in componentWillMount go here

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TipOfDayApp).call(this, props));

    _this2.state = {
      data: null
    };
    if (getCookie('tip_of_day') != 'closed') {
      _this2.getCurrentTip();
    }
    return _this2;
  }

  _createClass(TipOfDayApp, [{
    key: "getCurrentTip",
    value: function getCurrentTip() {
      var _this3 = this;

      $.getJSON(TIPS_URL_ROOT + "get_current_tip/", function (data) {
        return _this3.setState({ data: data });
      }).fail(function () {
        return _this3.setState({ data: null });
      });
    }
  }, {
    key: "markRead",
    value: function markRead(id, callback) {
      console.log('mark as read');
      $.post(TIPS_URL_ROOT + "mark_tip_as_read/" + id, function (data) {
        if (data && data.status == 'success') {
          if (callback) {
            callback();
          }
        } else {
          console.warn('Mark as read failed');
        }
      });
    }
  }, {
    key: "handleNext",
    value: function handleNext(event) {
      var _this4 = this;

      this.markRead(this.state.data.id, function () {
        return _this4.getCurrentTip();
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose(event) {
      this.markRead(this.state.data.id);
      this.setState({ data: null });
      setCookie('tip_of_day', 'closed', 1);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.data) {
        return React.createElement(TipOfDay, { title: this.state.data.title, text: this.state.data.rendered_text, onNext: this.handleNext.bind(this), onClose: this.handleClose.bind(this) });
      } else {
        return React.createElement("span", null);
      }
    }
  }]);

  return TipOfDayApp;
}(React.Component);

ReactDOM.render(React.createElement(TipOfDayApp, null), document.getElementById('tip_of_day_container'));