class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.integer :quantity
      t.monetize :price

      t.timestamps null: false
    end
  end
end
