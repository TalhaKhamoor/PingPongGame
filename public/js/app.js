var app = {
  //initial variables
  canvas: null,
  context: null,

  //resizing
  width: 800,
  height: 400,

  //nodes
  nodes: [],

  //timing
  timestamp: 0,
  now: 0,
  lastUpdate: 0,

  init: function () {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");

    this.render();
    this.onInit();
  },
  render: function () {
    this.clear();
    this.update();

    window.requestAnimationFrame(this.render.bind(this));
  },
  clear: function () {
    this.context.clearRect(0, 0, this.width, this.height);
  },
  update: function () {
    var dt = Date.now() - this.lastUpdate;

    this.onUpdate(dt);

    for (var index in this.nodes) {
      var node = this.nodes[index];

      if (node.id == "ball") {
        this.context.beginPath();
        this.context.arc(node.x, node.y, node.width, 0, Math.PI * 2);
        this.context.fill();
      } else if (node.id == "text") {
        this.context.font = node.sizeAndFont;
        var y = node.y;
        var lineHeight = 30;
        var lines = node.value.split(",");

        for (var i = 0; i < lines.length; i++) {
          this.context.fillText(lines[i], node.x, y);
          y += lineHeight;
        }
      } else {
        this.context.fillStyle = node.color;
        this.context.fillRect(node.x, node.y, node.width, node.height);
      }
    }

    this.lastUpdate = Date.now();
    this.timestamp += dt;
  },
  pause: function () {
    this.pause();
  },
  reset: function () {
    this.reset();
  },
  getNode: function (id) {
    for (var index in this.nodes) {
      var node = this.nodes[index];

      if (node.id == id) {
        return node;
      }
    }

    return { x: null, y: null, width: null, height: null };
  },

  //events
  onInit: function () {},
  onUpdate: function () {},
};

window.onload = function () {
  app.init();
};
