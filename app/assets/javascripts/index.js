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

  function clickHTML(user){
    var userId = user.attr("data-user-id");
    var html =`<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${userId}'>
                <p class='chat-group-user__name'>${user.attr("data-user-name")}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>`
    return html;
  };

  // 追加ボタンを押すと、そのユーザーをチャットメンバーに加える
  $(document).on('click', '.chat-group-user__btn--add', function() {
    var userName = $(this).data('user-name');
    var userId = $(this).data('user-id');
    $(this).parent().remove();
    var html =`<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value="${userId}">
                <p class='chat-group-user__name'>${userName}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>`
    $('#chat-group-users').append(html);
  });

});