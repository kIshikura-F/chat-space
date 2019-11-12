$(document).on('turbolinks:load', function(){

  function buildPost(post) {
    var content = post.content ? `${ post.content }` : "";
    var img = post.image.url ? `<img src= "${ post.image.url }" id="chat-message__image">` : "";
    var html = `<div class="chat-message" data-id="${post.id}">
                  <div class="chat-message__user">
                    <p class="chat-message__user__name">
                      ${post.name}
                    </p>
                    <p class="chat-message__user__date">
                      ${post.date}
                    </p>
                  </div>
                  <div class="chat-message__text">
                    <p class="chat-message__content">
                      ${content}
                    </p>
                    ${img} 
                  </div>
                </div>`
  return html;
  }

  $('#new_post').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildPost(data);
      $('.chat-messages').append(html)
      $("#new_post")[0].reset();
      $('.chat-messages').animate({ scrollTop: $('.chat-messages')[0].scrollHeight });
    })

    .fail(function(){
      alert('送信に失敗しました')
    })
    .always(function(data){
      $('.send').prop('disabled', false);
    })
  })

  //自動更新
  var reloadPosts = function () {
    if (window.location.href.match(/\/groups\/\d+\/posts/)){
      var last_post_id = $('.post:last').data("post-id"); 

      $.ajax({ 
        url: "api/posts",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_post_id}
      })
      .done(function (posts) { 
        var insertHTML = '';
        posts.forEach(function (post) {
          insertHTML = buildHTML(post);
          $('.chat-messages').append(insertHTML);
        })
        $('.chat-messages').animate({scrollTop: $('.chat-messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
})