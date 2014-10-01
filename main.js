(function(){

    window.App = {
      Models: {},
      Collections: {},
      Views: {}
    };

    window.template = function(id){
        return _.template( $('#' + id).html());
    };

// Person Model
    App.Models.Person = Backbone.Model.extend({
        defaults:{
            name: 'deepti',
            age: '23',
            occupation: 'software developer'
        }
    });


// A List of People
    App.Collections.PeopleCollection = Backbone.Collection.extend({
        model: App.Models.Person

    });


// View for all people
    App.Views.PeopleView = Backbone.View.extend({
        tagName: 'ul',

        render: function(){
            this.collection.each(function(person){
                var personView = new App.Views.PersonView({model: person});
                this.$el.append(personView.render().el);
            }, this);
            return this;
        }
    });


// The View for a Person
    App.Views.PersonView = Backbone.View.extend({
        tagName: 'li',

        template:  template('personTemplate'),

        events: {
          'click .edit': 'editPerson'
        },

        editPerson: function(){
            var newName = prompt("Please enter the new name", this.model.get('name'));
            this.model.set('name', newName);
        },

        render: function(){
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }
    });


    var peopleCollection = new App.Collections.PeopleCollection([
        {
            name: 'Mohit Jain',
            age: 26
        },
        {
            name: 'Taroon Tyagi',
            age: 25,
            occupation: 'web designer'
        },
        {
            name: 'Rahul Narang',
            age: 26,
            occupation: 'Java Developer'
        }
    ]);

    var peopleView = new App.Views.PeopleView({collection: peopleCollection});
    $(document.body).append(peopleView.render().el);
})();

