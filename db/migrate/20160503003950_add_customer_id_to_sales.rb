class AddCustomerIdToSales < ActiveRecord::Migration
  def change
    add_column :sales, :customer_id, :integer
    add_index :sales, :customer_id
  end
end
