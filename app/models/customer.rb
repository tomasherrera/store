class Customer < ActiveRecord::Base
  has_many :purchases, foreign_key: "customer_id", class_name: "Sale"
end
