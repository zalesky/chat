Router.route('/', {
    name:'home',
    template: 'home'
});
Router.route('/register');
Router.route('/login');
Router.route('/editprof');
Router.route('/loc/:country',{
    template:'location',
    data: function(){
        //console.log(this.params.country)
        return { text: this.params.country };
    }
});
Router.configure({
    layoutTemplate: 'main'
});

