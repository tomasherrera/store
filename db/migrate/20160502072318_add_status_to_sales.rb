class AddStatusToSales < ActiveRecord::Migration
  def change
    add_column :sales, :status, :string, default: "draft"
  end
end
