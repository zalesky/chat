if (Meteor.isClient) {
    Template.editprof.helpers({
        mail:function(){
            return Meteor.user().emails[0].address;
        },
        name:function(){
            return Meteor.user().username;
        },
        location:Location
    });
    Template.editprof.events({
        'submit form': function (event) {
            event.preventDefault();
            var email = $('[name=email]').val();
            var name = $('[name=name]').val();
            var oldpassword = $('[name=oldpassword]').val();
            var newpassword = $('[name=newpassword]').val();
            var location = $('[name=location]').val();
            if(oldpassword&&newpassword){
                Accounts.changePassword(oldpassword, newpassword,  function(error){
                    if(error){
                        console.log(error.reason);
                    } else {
                        Router.go("home");
                    }
                })
            };
            if(email){
                Meteor.call('changeEmail',Meteor.userId(),email)
            };
            if(name){
                Meteor.call('changeUserName',Meteor.userId(),name)
            };
            if(Meteor.user().profile.location!=location){
                Meteor.call('changeUserLocation',Meteor.userId(),location);
                Router.go('/loc/'+location);
            };
            //Router.go('home');
        },
        'reset form': function(){
            event.preventDefault();
            Router.go('home');
        }
    });
}

Meteor.methods({
    changeEmail: function(id,email) {
        Meteor.users.update(id,{$set: {'emails.0.address': email}});
    },
    changeUserName: function(id,name) {
        Accounts.setUsername(Meteor.userId(), name)
    },
    changeUserLocation:function(id,location){
        Meteor.users.update({_id:id}, { $set: {'profile.location': location} });
    }
});
