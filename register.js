if (Meteor.isClient) {
    Template.register.events({
        'submit form': function (event) {
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password,
                username: email,
                profile:{
                    location:'Ukraine'
                }
            }, function(error){
                if(error){
                    console.log(error.reason);
                } else {
                    Router.go("home");
                }
            });
            Router.go('home');
        }
    });
}


