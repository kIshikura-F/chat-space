json.array! @posts do |post|
  json.content post.content
  json.image   post.image
  json.date    post.created_at.strftime("%Y/%m/%d %H:%M")
  json.name    post.user.name
  json.id      post.id
end