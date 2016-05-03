class Sale < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer
  monetize :total_centavos, :as => "total"
  serialize :items
end
