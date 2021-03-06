phina.globalize();

// global variables
var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 960;
var PIECE_SIZE      = 80;
var PIECE_SIZE_HALF = PIECE_SIZE / 2;

// MainScene Class メインシーンクラス
phina.define("MainScene", {
  superClass: 'DisplayScene',

  // コンストラクタ constructor
  init: function(){
    this.superInit({
      width:  SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });

    this.fromJSON({
      children: {
        wordGroup: {
          className: 'DisplayElement'
        },
        scoreLabel: {
          className: 'Label',
          x: this.gridX.span(15),
          y: this.gridX.span(1),
          align: 'right'
        }
      }
    });

    // ローカル変数　local varaibles 
    this.score = 0;
    this.scoreLabel.text = this.score + '';
  },

  // キーが押されたときの関数
  onkeydown: function(event){
    var input_character = String.fromCharCode(event.keyCode);
    var wordGroup = this.wordGroup;
    var result = wordGroup.children.some(function(word){
      if(word.enable && word.text == input_character){
        // a word disappers
        word.disappear();
        return true;
      }

      return false;
    });

    // 文字が消えたら
    // when a word disappears
    if(result){
      this.score += 1;
      this.scoreLabel.text = this.score + '';
    }

    // when the space bar gets typed, the app stops
    // スペースキーが押されたときに、アプリが止まる
    if(event.keyCode === 32){
      this.app.stop();
    }
  },

  update: function(app){
    if(app.frame % 16 === 0){
      this.createWord();
    }
  },

  // 文字が作られる
  createWord: function(){
    // 文字コード
    var ascii = [
      48, 49,
      50, 51, 52, 53, 54, 55, 56, 57,
      65, 66, 67, 68, 69, 
      70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89
    ];

    // 入力された文字を取得
    // get a word from the keyboard
    var character = String.fromCharCode(ascii.pickup());
    var word = Word(character).addChildTo(this.wordGroup);
    word.x = Math.randint(PIECE_SIZE_HALF, this.gridX.width - PIECE_SIZE_HALF);
    word.y = -100;

    // exits when a word gets down to the bottom
    word.onattack = function() {
      this.exit({
        score: this.score,
      });
    }.bind(this);

    return word;
  }
});

// 文字クラス
phina.define('Word', {
  superClass: 'Button',

  // constructor
  // コンストラクタ
  init: function(word){
    this.superInit({
      width:  PIECE_SIZE,
      height: PIECE_SIZE,
      text:   word
    });

    this.enable = true;
  },

  update: function(){
    this.y += 8;

    if(this.y > 960){
      this.flare('attack');
      this.remove();
    }
  },

  // disappear function
  disappear: function(){
    this.enable = false;
    this.tweener
        .to({
          scaleX: 2, 
          scaleY: 2,
          alpha: 0,
        }, 250)
        .call(function(){
          this.target.remove();
        });
  }
});

// メイン関数
phina.main(function() {
  var app = GameApp({
    title: 'Typing Game',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    startLabel: location.search.substr(1).toObject().scene || 'title',
  });

  app.run();
});