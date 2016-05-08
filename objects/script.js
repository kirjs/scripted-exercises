const config = {
  tileSize: 100,
  left: 100,
  top: 100,
  title: 'Very good game',
  objects: [
    {x: 0, y: 0, image: 'roadNS'},
    {x: 1, y: 0, image: 'roadNS'},
    {x: 2, y: 0, image: 'roadNS'},
    {x: 3, y: 0, image: 'crossroadNSW'}
  ],
  character: {x: 1, y: 0, image: 'hero'}
};


const defaultConfig = {
  title: 'title',
  width: 10,
  height: 10
};

const finalConfig = _.merge({}, defaultConfig, config);

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