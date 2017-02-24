class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name, null: false, unique: true

      t.hstore :keywords_hs, null: false
      t.string :keywords_arr, null: false, array: true, default: []
      t.jsonb :keywords_jsonb, null: false, default: '{}'

      t.timestamps null: false
    end
  end
end
