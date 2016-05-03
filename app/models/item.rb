class Item < ActiveRecord::Base
  monetize :price_centavos, :as => "price"
end
