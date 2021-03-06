'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var exercise = window.location.hash.replace('#', '') || 'add';

var codeMirror;
var config = {
  session: '' + exercise,
  initialJs: "// Write you code here",
  files: {
    js: {
      before: ["//cdnjs.cloudflare.com/ajax/libs/mocha/2.3.3/mocha.js", "//cdnjs.cloudflare.com/ajax/libs/chai/3.4.1/chai.js", "runner/before.js"],
      after: ["runner/after.js"],
      tests: ['exercises/' + exercise + '/tests.js']
    },
    css: ["//cdnjs.cloudflare.com/ajax/libs/mocha/2.3.3/mocha.css", "runner/style.css"]
  },
  elements: {
    codemirror: document.getElementById('codemirror'),
    tests: document.getElementById('tests'),
    camel: document.getElementById('camel')
  },
  camel: {
    messages: {
      0: {
        image: 'camel.jpg',
        title: 'Hello, I\'m a JavaScript camel',
        message: 'Please write some JavaScript so I can eat it!'
      },
      50: {
        image: 'camel-30.jpg',
        title: '',
        message: 'Can I have more JavaScript please?'
      },
      100: {
        image: 'camel-happy.jpg',
        title: 'All done',
        message: 'Please submit the code to google classroom.'

      },
      error: {
        image: 'error.jpg',
        title: 'Looks like something got broken :('
      }
    }
  }

};

function Camel(config) {
  this.config = config;
  this.el = config.elements.camel;
}

Camel.prototype.render = function (state, message) {
  var data = this.config.camel.messages[state];

  this.el.innerHTML = '\n    <img src = "images/' + (data.image || 'camel.png') + '">\n    <h1>' + (data.title || '') + '</h1>\n    <div>' + (message || data.message || '') + '</div>\n  ';
};

Camel.prototype.render = function (state, message) {
  var data = this.config.camel.messages[state];

  this.el.innerHTML = '\n    <img src = "images/' + (data.image || 'camel.png') + '">\n    <h1>' + (data.title || '') + '</h1>\n    <div>' + (message || data.message || '') + '</div>\n  ';

  if (state.action) {
    this.el.innerHTML = '<button>' + state.action.name + '</button>';
  }
};

Camel.prototype.displayProgress = function (progress) {
  progress = Math.floor(progress);
  var messages = this.config.camel.messages;
  for (var i = progress; i >= 0; i--) {
    if (messages[i]) {
      this.render(i);
      break;
    }
  }
};

function startCamel(config, saver) {
  var camel = new Camel(config);
  var settings = {
    localStorage: {
      codeKey: config.session + '-code',
      historyKey: config.session + '-history'
    },
    cache: {
      result: -1
    }
  };

  var handleResultChange = function handleResultChange(result) {
    if ((settings.cache.result || 0) < result) {
      saver.save({
        score: result,
        code: codeMirror.getValue()
      });
      settings.cache.result = result;
    }
  };

  function jsInjector(iframe) {
    return function (script) {
      iframe.contentWindow.eval(script);
    };
  }

  function cssInjector(iframe) {
    return function (css) {
      var s = iframe.contentDocument.createElement("style");
      s.innerHTML = css;
      iframe.contentDocument.getElementsByTagName("head")[0].appendChild(s);
    };
  }

  function appendIframe(iframe) {
    var testContainer = document.getElementById('tests');
    testContainer.appendChild(iframe);
  }

  function injectIframe(code) {
    var _arguments = arguments;

    var iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts');
    iframe.setAttribute('frameBorder', '0');

    appendIframe(iframe);

    iframe.contentDocument.body.innerHTML = '<div id = "not-up-to-date"></div><div id = "mocha"></div>';

    var runJs = jsInjector(iframe);
    settings.cache.jsBefore.map(runJs);
    settings.cache.css.map(cssInjector(iframe));

    iframe.contentWindow.console = {
      log: function log() {
        console.log.apply(console, _arguments);
      }
    };

    try {
      runJs(code);
    } catch (e) {
      camel.render('error', e.message);
      if (settings.cache.iframe) {
        settings.cache.iframe.contentWindow.jsCamelNotUpToDate();
      }
      iframe.remove();
      throw e;
    }

    if (settings.cache.iframe) {
      settings.cache.iframe.remove();
    }
    settings.cache.iframe = iframe;

    iframe.contentWindow.jsCamelHandleResult = function (result) {
      camel.displayProgress(result);
      handleResultChange(result);
    };

    settings.cache.tests.map(runJs);
    settings.cache.jsAfter.map(runJs);
    return iframe;
  }

  function runCode(code) {
    injectIframe(code);
  }

  function startEditor() {
    codeMirror = CodeMirror(config.elements.codemirror, {
      value: localStorage.getItem(settings.localStorage.codeKey) || config.initialJs,
      history: history || config.initialJs,
      mode: "javascript",
      autofocus: true
    });
    codeMirror.on('change', function (editor) {
      var value = editor.getValue();
      localStorage.setItem(settings.localStorage.codeKey, value);
      localStorage.setItem(settings.localStorage.historyKey, JSON.stringify(editor.getHistory()));
      runCode(value);
    });

    var history = localStorage.getItem(settings.localStorage.historyKey);
    history = history && JSON.parse(history);
    if (history) {
      codeMirror.setHistory(history);
    }
    runCode(codeMirror.getValue());
  }

  function preloadFiles(files) {

    return Promise.all(files.map(function (a) {
      return fetch(a, { cache: "no-cache" }).then(function (a) {
        return a.text();
      });
    }));
  }

  Promise.all([preloadFiles(config.files.js.before), preloadFiles(config.files.js.after), preloadFiles(config.files.css), preloadFiles(config.files.js.tests)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 4);

    var jsBefore = _ref2[0];
    var jsAfter = _ref2[1];
    var css = _ref2[2];
    var tests = _ref2[3];

    settings.cache.jsBefore = jsBefore || [];
    settings.cache.jsAfter = jsAfter || [];
    settings.cache.css = css || [];
    settings.cache.tests = tests || [];
    startEditor();
  });
}

function FirebaseSaver(ref, user, session) {
  this.ref = ref;
  this.user = user;
  this.session = session;
  this.feed = ref.child('exercises').child(session).child(user.google.displayName);
}

function getHighestScore(vals) {
  return Object.keys(vals || {}).reduce(function (max, val) {
    return Math.max(max, vals[val].score);
  }, 0);
}

FirebaseSaver.prototype.save = function (data) {
  var _this = this;

  this.feed.once("value", function (snapshot) {
    var vals = snapshot.val();
    var highest = getHighestScore(vals);

    if (!vals || data.score > highest) {
      _this.feed.push(data);
    }
  });
};

var ref = new Firebase("https://blinding-fire-5861.firebaseio.com");

ref.authWithOAuthPopup("google", function (error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    document.getElementById('popup-warning').remove();
    startCamel(config, new FirebaseSaver(ref, authData, config.session));
  }
});