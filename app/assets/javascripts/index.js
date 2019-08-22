$(function() {

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  };

  $(document).on('turbolinks:load', function(){
    $("#user-search-field").on("keyup", function() {
      var input = $('#user-search-field').val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $(".user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = appendUser(user);
            $(".user-search-result").append(html);
          });
        }
      })

      .fail(function(){
        alert('通信に失敗しました');
      })
    });
  });
});