class AddPaymentToSales < ActiveRecord::Migration
  def change
    add_column :sales, :payment, :string, default: 'efectivo'
  end
end
