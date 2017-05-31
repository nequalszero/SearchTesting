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

  def self.create_new_product(keywords)
    keywords = keywords.map { |kw| kw.split(" ") }.flatten
    name = keywords.join(" ")
    tag_names_ids = keywords.map { |kw| TagName.retrieve_tag_name(kw.downcase) }
    keywords_hash = {}
    tag_names_ids.each { |tag_name_id| keywords_hash[tag_name_id] = true}

    params = {
      name: name,
      keywords_hs: keywords_hash,
      keywords_arr: tag_names_ids,
      keywords_jsonb: keywords_hash
    }

    product = Product.create(params)

    tag_names_ids.each do |tag_name_id|
      TagMap.assign_product_id(tag_name_id, product.id)
      Tag.create({tag_name_id: tag_name_id, product_id: product.id})
    end
  end

  def self.create_product_params(keywords)
    keywords = keywords.map { |kw| kw.split(" ") }.flatten
    name = keywords.join(" ")
    keywords = keywords.map { |kw| kw.downcase }
    keywords_hash = {}
    keywords.each { |kw| keywords_hash[kw] = true}

    params = {
      name: name,
      keywords_hs: keywords_hash,
      keywords_arr: keywords,
      keywords_jsonb: keywords_hash
    }
  end

  # Makes 2 queries:
  # => 1 for getting tag_name_ids,
  # => 1 for querying the hstore column of the products table
  # Accepts an array of strings (keywords)
  def self.select_products_by_hstore(keywords, count = false)
    tag_name_ids = TagName.get_tag_name_ids(keywords).map(&:id).map(&:to_s)
    products = Product.where("keywords_hs ?& ARRAY[:array]", array: tag_name_ids)
    count ? products.count : products
  end

  # Makes a single query to the hstore column of the products table with a subquery
  # => to the tag_names table
  # Accepts an array of strings (keywords)
  def self.select_products_by_hstore_v2(keywords, count = false)
    products = Product.find_by_sql ["
      SELECT
        *
      FROM
        products
      WHERE
        keywords_hs ?& ARRAY[ARRAY(
          SELECT
            id
          FROM
            tag_names
          WHERE
            name IN (:array)
          )]::varchar[]", {array: keywords}]

    count ? products.count : products
  end

  # Makes 2 queries:
  # => 1 for getting tag_name_ids,
  # => 1 for querying the jsonb column of the products table
  # Accepts an array of strings (keywords)
  def self.select_products_by_jsonb(keywords, count = false)
    tag_name_ids = TagName.get_tag_name_ids(keywords).map(&:id).map(&:to_s)
    products = Product.where("keywords_jsonb ?& ARRAY[:array]", array: tag_name_ids)
    count ? products.count : products
  end

  # Makes a single query to the jsonb column of the products table with a subquery
  # => to the tag_names table
  # Accepts an array of strings (keywords)
  def self.select_products_by_jsonb_v2(keywords, count = false)
    products = Product.find_by_sql ["
      SELECT
        *
      FROM
        products
      WHERE
        keywords_jsonb ?& ARRAY[ARRAY(
          SELECT
            id
          FROM
            tag_names
          WHERE
            name IN (:array)
          )]::varchar[]", {array: keywords}]

    count ? products.count : products
  end

  # Makes 2 queries:
  # => 1 for getting tag_name_ids,
  # => 1 for querying the array column of the products table
  # Accepts an array of strings (keywords)
  def self.select_products_by_array(keywords, count = false)
    tag_name_ids = TagName.get_tag_name_ids(keywords).map(&:id)
    products = Product.where("keywords_arr @> ARRAY[:array]::varchar[]", array: tag_name_ids)
    count ? products.count : products
  end

  # Makes a single query to the array column of the products table with a subquery
  # => to the tag_names table
  # Accepts an array of strings (keywords)
  def self.select_products_by_array_v2(keywords, count = false)
    products = Product.find_by_sql ["
      SELECT
        *
      FROM
        products
      WHERE
        keywords_arr @> ARRAY[ARRAY(
          SELECT
            id
          FROM
            tag_names
          WHERE
            name IN (:array)
          )]::varchar[]", {array: keywords}]

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

  # Makes a single query that joins the products, tags, and tag_names tables.
  # Takes many strings as an argument or a splatted array, e.g.
  # => Product.select_products_by_tags("the", "north", "face")      or
  # => Product.select_products_by_tags(*["the", "north", "face"])   or
  # => Product.select_products_by_tags(*"the north face".split(" "))
  def self.select_products_by_tags(*keywords)
    Product.find_by_sql([<<-SQL, keywords, keywords.count])
      SELECT
        products.*
      FROM
        products
      JOIN
        tags ON tags.product_id = products.id
      JOIN
        tag_names on tag_names.id = tags.tag_name_id
      WHERE
        tag_names.name IN (?)
      GROUP BY
        products.id
      HAVING
        COUNT(*) = ?
    SQL
  end

  # Makes three queries.
  # => one query to the tag_name_ids table,
  # => one query to the tags table, and
  # => a final query to the products table.
  # Takes many strings as an argument or a splatted array, e.g.
  # => Product.select_products_by_tags("the", "north", "face")      or
  # => Product.select_products_by_tags(*["the", "north", "face"])   or
  # => Product.select_products_by_tags(*"the north face".split(" "))
  def self.select_products_by_tags_v2(*keywords)
    tag_name_ids = TagName.get_tag_name_ids(keywords)

    product_ids = Product.find_by_sql([<<-SQL, tag_name_ids, keywords.count])
      SELECT
        product_id
      FROM
        tags
      WHERE
        tags.tag_name_id IN (?)
      GROUP BY
        tags.product_id
      HAVING
        COUNT(*) = ?
    SQL

    Product.find(product_ids.map(&:product_id))
  end

  # Similar to select_products_by_tags_v2 method above but utilizes 2 subqueries
  # => to keep subquery results SQL-side.
  # Takes many strings as an argument or a splatted array, e.g.
  # => Product.select_products_by_tags("the", "north", "face")      or
  # => Product.select_products_by_tags(*["the", "north", "face"])   or
  # => Product.select_products_by_tags(*"the north face".split(" "))
  def self.select_products_by_tags_v3(*keywords)
    Product.find_by_sql([<<-SQL, keywords, keywords.count])
      SELECT
        *
      FROM
        products
      WHERE
        id IN (
          SELECT
            product_id
          FROM
            tags
          WHERE
          tags.tag_name_id IN (
            SELECT
              id
            FROM
              tag_names
            WHERE
              name IN (?)
          )
          GROUP BY
            tags.product_id
          HAVING
            COUNT(*) = ?
        )
    SQL
  end

  # Takes many strings as an argument or a splatted array, e.g.
  # => Product.select_products_by_tags("the", "north", "face")      or
  # => Product.select_products_by_tags(*["the", "north", "face"])   or
  # => Product.select_products_by_tags(*"the north face".split(" "))
  def self.select_products_by_tags_with_subqueries(*keywords)
    Product.find_by_sql([<<-SQL, keywords, keywords.count])
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
