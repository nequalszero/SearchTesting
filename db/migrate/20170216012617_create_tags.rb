class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.references :product, null: false, index: true, foreign_key: true, unique: true
      t.references :tag_name, null: false, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
