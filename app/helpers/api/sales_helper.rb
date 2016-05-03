module Api::SalesHelper
  def format_sale_items(items)
    begin
      items = truncate(items.map{|i| "(#{i[:quantity]}) " + i[:name]}.to_sentence(locale: :es), length: 110, omission: '... (continua)')
    rescue => ex
      items = truncate(eval(items).map{|i| "(#{i[:quantity]}) " + i[:name]}.to_sentence(locale: :es), length: 110, omission: '... (continua)')
    end
    return items
  end
end
