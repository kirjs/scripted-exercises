var defaultConfig = {
  title: '',
  left: 0,
  top: 0,
  tileSize: 20,
  objects: [],
  character: {}
};

const config = _.merge({}, defaultConfig, game);

var Tile = (props)=>{
  const config = props.tileConfig;
  const tileSize = props.config.tileSize;

  var style = {
    width: tileSize,
    height: tileSize,
    left: props.config.left + (config.x - config.y) * tileSize / 2,
    top: props.config.top + (config.x + config.y) * props.config.tileSize / 4,
    backgroundImage: 'url(http://kirjs.github.io/scripted-exercises/objects/images/' + config.image + '.png)',
    backgroundSize: props.config.tileSize
  };
  var className = 'tile ' + config.image;

  return <div className={className} style={style}></div>;
};

let World = React.createClass({
  handleAction: function (button){
    button.action();
    this.setState(config);
  },
  render: function (){
    var config = this.props.config;
    var tiles = _.map(config.objects, (object)=>{
      return <Tile config={config} tileConfig={object}/>
    });
    var character = <Tile config={config} tileConfig={config.character}/>;
    var buttons = _.map(config.buttons, (button, key)=>{
      return <button key={key} onClick={this.handleAction.bind(this, button)}>
        {button.name}
      </button>
    });

    return <div>
      <h1>{config.title}</h1>
      {buttons}
      {tiles}
      {character}
    </div>
  }
});

ReactDOM.render(
  <World config={config}/>,
  document.getElementById('container')
);