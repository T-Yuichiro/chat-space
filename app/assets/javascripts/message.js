$(function(){
  function buildHTML(message){
    var MessageImage = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                   </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                     ${message.content}
                    </p>
                     ${MessageImage}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    });
  });

  // 自動更新のメソッドを定義する
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data("message-id");
    var last_message_id = $('.message:last').data('message-id');

    $.ajax({
      url: 'api/messages',
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })

    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      });
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
   };
  };
  setInterval(reloadMessages, 5000);
});