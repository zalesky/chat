if (Meteor.isClient) {
    Template.navigation.helpers({
        location:Location
    });
    Template.navigation.events({
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
            Router.go('login');
        }
    });
}
