# == Schema Information
#
# Table name: products
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  keywords_hs    :hstore           not null
#  keywords_arr   :string           default("{}"), not null, is an Array
#  keywords_jsonb :jsonb            default("{}"), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# require_relative '../../lib/sleeping_bag_helper'
# require_relative '../../lib/product_helper'
require 'benchmark'

class Product < ActiveRecord::Base
  has_many :tags
  has_many :tag_names, through: :tags

  validates :name, :keywords_hs, :keywords_arr, :keywords_jsonb, presence: true

  def self.create_new_product(params)
    product = Product.create(params)

    params[:keywords_arr].each do |kw|
      tag_name = TagName.retrieve_tag_name(kw)
      TagMap.assign_product_id(tag_name.id, product.id)
      Tag.create({tag_name_id: tag_name.id, product_id: product.id})
    end
  end

  # Accepts an array of strings (keywords)
  def self.select_products_by_hstore(keywords, count = false)
    products = Product.where("keywords_hs ?& ARRAY[:array]", array: keywords)
    count ? products.count : products
  end

  # Accepts an array of strings (keywords)
  def self.select_products_by_jsonb(keywords, count = false)
    products = Product.where("keywords_jsonb ?& ARRAY[:array]", array: keywords)
    count ? products.count : products
  end

  def self.select_products_by_array(keywords, count = false)
    products = Product.where("keywords_arr @> ARRAY[:array]::varchar[]", array: keywords)
    count ? products.count : products
  end

  def self.new_product_test
    params = { name: "test product",
               keywords_hs: {test: true, product: true},
               keywords_arr: ["test", "product"],
               keywords_jsonb: {test: true, product: true}
              }
    product = Product.create_new_product(params)
  end

  def self.select_products_by_tags(*keywords)
    products = Product.find_by_sql([<<-SQL, keywords, keywords.count])
      SELECT
        *
      FROM
        products
      JOIN
        (
          SELECT
            product_id
          FROM
            tags
          JOIN
            tag_names ON tags.tag_name_id = tag_names.id
          WHERE
            tag_names.name IN (?)
          GROUP BY
            product_id
          HAVING
            COUNT(*) = ?
        ) AS matches ON matches.product_id = products.id
    SQL
  end

end
