Messages = new Mongo.Collection("messages");
Location = [
    { text: "Ukraine" },
    { text: "Poland" },
    { text: "Madagascar" },
    { text: "Zimbabwe" }
];


//Clear Collections Messages when Server Sturtup
if (Meteor.isServer) {
    Meteor.startup(function() {
        return Meteor.methods({
            removeAllMessages: function() {
                return Messages.remove({});
            }
        });
    });
    Meteor.startup(function() {
        Meteor.call('removeAllMessages');
    })
}
