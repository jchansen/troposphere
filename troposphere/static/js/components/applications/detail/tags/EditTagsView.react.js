/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    './ActualEditTagsView.react',
    'actions',
    'stores'
  ],
  function (React, Backbone, EditTagsView, actions, stores) {

    return React.createClass({

      propTypes: {
        application: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        tags: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        onChange: React.PropTypes.func.isRequired
      },

      getInitialState: function(){
        return {
          tags: this.props.application.get('tags')
        }
      },

      onTagsChanged: function(tags){
        this.props.onChange(tags);
      },

      onCreateNewTag: function(tagNameSuggestion){
        actions.TagActions.create(tagNameSuggestion);
      },

      render: function () {
        var application = this.props.application;
        var image = new this.props.application.constructor({
          id: application.id,
          tags: this.props.value
        });
        var applicationTags = stores.TagStore.getImageTags(image);

        return (
          <div className="image-tags image-info-segment row">
            <h4 className="title col-md-2">Tags</h4>
            <div className="content col-md-10">
              <EditTagsView tags={this.props.tags}
                            activeTags={applicationTags}
                            onTagsChanged={this.onTagsChanged}
                            onCreateNewTag={this.onCreateNewTag}
              />
            </div>
          </div>
        );
      }

    });

  });