json.array! @items do |item|
  json.name item.name
  json.price humanized_money_with_symbol(item.price)
  json.quantity 1
end
