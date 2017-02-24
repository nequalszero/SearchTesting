class CreateTagMaps < ActiveRecord::Migration
  def change
    create_table :tag_maps do |t|
      t.references :tag_name, null: false, index: true, unique: true, foreign_key: true
      t.integer :product_ids, null: false, array: true, default: []
      t.timestamps null: false
    end
  end
end
