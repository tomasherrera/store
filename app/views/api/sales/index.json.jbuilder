json.array! @sales do |sale|
  json.user_name sale.user.name
  json.customer_id sale.customer_id
  if sale.customer.present?
    json.customer_name sale.customer.name
    json.customer_doc sale.customer.cedula
  else
    json.customer_name "No Registra"
    json.customer_doc "No Registra"
  end
  json.payment sale.payment
  json.status sale.status
  json.raw_items sale.items
  json.created_at sale.created_at
  json.date_and_time I18n.localize sale.created_at, format: :complex
  json.time I18n.localize sale.created_at, format: :timeonly
  begin
    json.items truncate(sale.items.map{|i| "(#{i[:quantity]}) " + i[:name]}.to_sentence(locale: :es), length: 110, omission: '... (continua)')
  rescue => ex
    json.items truncate(eval(sale.items).map{|i| "(#{i['quantity']}) " + i["name"]}.to_sentence(locale: :es), length: 110, omission: '... (continua)')
  end
  json.total humanized_money_with_symbol(sale.total)
end