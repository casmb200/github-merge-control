$(function() {

  var setting = {};
  setting = {
      url: 'http://ghe.aws01.mapion.co.jp',
      user: 'mapiondev',
      repository: 'contents',
      branch: 'release'
  };

  chrome.storage.local.get(setting, function(items) {

    var TARGET_URL = items.url;
    var TARGET_USER = items.user;
    var TARGET_REPOSITORY = items.repository;
    var TARGET_BRANCH = items.branch;

    merge_control();
    $(window).on('statechange', function(e, data) {
      if (history.state.url !== undefined) {
        merge_control();
      }
    });

    function merge_control() {

      // target Pull Request URL
      if (location.href.search(TARGET_URL) != -1 && location.href.search(/\/pull\//) != -1) {
        $('.btn-group-merge').ready(function() {
          if (is_target_request() && is_target_title()) {
            $('.btn-group-merge>.js-details-target').attr('disabled', 'disabled');
            $('.btn-group-merge>.js-details-target').html('Do not merge!');
            $('.btn-group-merge>.js-menu-target').attr('disabled', 'disabled');
          }
        });
      }
    }

    // target user, repository, and branch
    function is_target_request() {
      var base_ref = $('span.base-ref').attr('title') || '';
      var array = base_ref.split(/[\/:]/);
      if (array.length == 3) {
        if (array[0] == TARGET_USER && array[1] == TARGET_REPOSITORY && array[2] == TARGET_BRANCH) {
          return true;
        }
      }
      return false;
    }

    // target title
    function is_target_title() {
      var title = $('span.js-issue-title').html() || '';
      if (title.search(/WIP/) != -1) {
        return true;
      }
      return false;
    }

  });

});
