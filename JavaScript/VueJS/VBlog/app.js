new Vue({
  el: '#vue-app',
  data: {
    name: 'baymax',
    job: 'robot',
    website: 'https://www.yahoo.co.jp/',
    websiteTag: '<a href = "http://www.thenetninja.co.uk">The Net Ninja Website</a>',
    age: 25,
    x: 0,
    y: 0,
    log_name: '',
    log_age: '',
    a: 0,
    b: 0,
    computatedAge: 20,
    available: false,
    nearby: false,
    success: false,
    error: false
  },
  methods: {
    greet: function(time){
      return 'Good ' + time + ' ' + this.name;
    },
    add: function(increment){
      this.age += increment;
    },
    subtract: function(decrement){
      this.age -= decrement;
    },
    updateXY: function(event){
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
    click: function(){
      alert('You clicked me');
    },
    logName: function(){
      console.log('you entered your name');
    },
    logAge: function(){
      console.log('your entered your log');
    },
  },
  computed: {
    addToA: function(){
      return this.a + this.computatedAge;
    },
    addToB: function(){
      return this.b + this.computatedAge;
    },
    compClasses: function(){
      return {
        available: this.available,
        nearby: this.nearby
      }
    }
  }
});

