class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.text :items
      t.references :user, index: true, foreign_key: true
      t.monetize :total
      t.timestamps null: false
    end
  end
end
