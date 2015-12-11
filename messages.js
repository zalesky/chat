if (Meteor.isClient) {

    Meteor.subscribe("messages");

    Template.messages.helpers({
        messages: function () {
            return Messages.find({ location: this.text }, {sort: {createdAt: 1}});
        }
    });

    Template.messages.events({
        'submit .inputMsg': function (event) {
            event.preventDefault();
            var text=event.target.text.value;
            if(!text)return;
            var time=new Date();
            Meteor.call('addMsg',text,time,this.text)
            event.target.text.value = "";
        }
    });
}

Meteor.methods({
    addMsg: function (text,time,location) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Messages.insert({
            message: text,
            createdAt: time,
            time:time.toTimeString().split(' ')[0],
            author: Meteor.userId(),
            username: Meteor.user().username,
            location: location
        });
    }
});
if (Meteor.isServer) {

    Meteor.publish('messages', function() {
        return Messages.find();
    });

}