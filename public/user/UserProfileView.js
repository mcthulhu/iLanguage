define([
    "use!backbone", 
    "use!handlebars", 
    "text!user/user.handlebars",
    "text!user/user_profile.handlebars",
    "corpus/CorpusesView",
    "user/User",
    "user/UserView",
    "libs/Utils"
], function(
    Backbone, 
    Handlebars, 
    userTemplate, 
    user_profileTemplate, 
    CorpusesView,
    User, 
    UserView
) {
  var UserProfileView = Backbone.View.extend(
  /** @lends UserProfileView.prototype */
  {
    /**
     * @class The UserProfileView shows information about the user, normal
     *        information such as username, research interests affiliations etc,
     *        but also a list of their corpora which will allow their friends to
     *        browse their corpora, and also give them a quick way to navigate
     *        between corpora.
     * 
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {
      Utils.debug("USER init: " + this.el);

      this.model.bind("change", this.render, this);

      // Create a CorpusesView
      this.corpusesView = new CorpusesView({
        collection : this.model.get("corpuses")
      });
    },

    /**
     * The underlying model of the UserProfileView is a User.
     */
    model : User,

    /**
     * The corpusesView is a child of the CorpusView.
     */
    corpusesView : CorpusesView,

    /**
     * The Handlebars template rendered as the UserProfileView
     */
    template : Handlebars.compile(user_profileTemplate),

    /**
     * The Handlebars template of the user header, which is used as a partial.
     */
    usertemplate : Handlebars.compile(userTemplate),

    /**
     * Renders the UserProfileView and its partial.
     */
    render : function() {
      Utils.debug("USER render: " + this.el);

      if (this.model != undefined) {
        // Register the partial
        Handlebars.registerPartial("user", this.usertemplate(this.model
            .toJSON()));

        // Display the UserProfileView
        this.setElement($("#user-profile-view"));
        $(this.el).html(this.template(this.model.toJSON()));

        // Display the CorpusesView
        this.corpusesView.render();

      } else {
        Utils.debug("\User model was undefined");
      }

      return this;
    }
  });

  return UserProfileView;
}); 