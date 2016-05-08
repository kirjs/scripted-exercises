'use strict';

var game = {
  tileSize: 100,
  left: 100,
  top: 100,
  title: 'Very good game',
  objects: [{ x: 0, y: 0, image: 'roadNS' }, { x: 1, y: 0, image: 'roadNS' }, { x: 2, y: 0, image: 'roadNS' }, { x: 3, y: 0, image: 'crossroadNSW' }],
  character: { x: 1, y: 0, image: 'hero' }
};

var defaultConfig = {
  title: 'title',
  width: 10,
  height: 10
};

var config = _.merge({}, defaultConfig, game);

var Tile = function Tile(props) {
  var config = props.tileConfig;
  var tileSize = props.config.tileSize;

  var style = {
    width: tileSize,
    height: tileSize,
    left: props.config.left + (config.x - config.y) * tileSize / 2,
    top: props.config.top + (config.x + config.y) * props.config.tileSize / 4,
    backgroundImage: 'url(http://kirjs.github.io/scripted-exercises/objects/images/' + config.image + '.png)',
    backgroundSize: props.config.tileSize
  };
  var className = 'tile ' + config.image;

  return React.createElement('div', { className: className, style: style });
};

var World = React.createClass({
  displayName: 'World',

  handleAction: function handleAction(button) {
    button.action();
    this.setState(config);
  },
  render: function render() {
    var _this = this;

    var config = this.props.config;
    var tiles = _.map(config.objects, function (object) {
      return React.createElement(Tile, { config: config, tileConfig: object });
    });
    var character = React.createElement(Tile, { config: config, tileConfig: config.character });
    var buttons = _.map(config.buttons, function (button, key) {
      return React.createElement(
        'button',
        { key: key, onClick: _this.handleAction.bind(_this, button) },
        button.name
      );
    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        config.title
      ),
      buttons,
      tiles,
      character
    );
  }
});

ReactDOM.render(React.createElement(World, { config: config }), document.getElementById('container'));