require_relative './product_seed_helper'

# Suppress ActiveRecord SQL that is logged when using find_by_sql
def disable_activerecord_sql_logging
  ActiveRecord::Base.logger.level = 1
end

# Re-enable ActiveRecord SQL logging
def enable_activerecord_sql_logging
  ActiveRecord::Base.logger.level = 0
end

# Accepts a 2D array of strings
def benchmark_block(keywords_arrays)
  Benchmark.bmbm do |x|
    x.report("by relation w/ subquery:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags_with_subqueries(*kw_arr) } }
    x.report("by relation:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags(*kw_arr) } }
    x.report("by relation v2:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags_v2(*kw_arr) } }
    x.report("by relation v3:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags_v3(*kw_arr) } }
    x.report("by jsonb:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_jsonb(kw_arr) }  }
    x.report("by hstore:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_hstore(kw_arr) }  }
    x.report("by array:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_array(kw_arr) }  }
  end
end

# Takes an optional number of keywords per group (default 1) and optional number of groups (default TagName.count)
# => Performs num_groups queries of num_keywords_per_group for each search method.
def test_search_methods(num_keywords_per_group = 1, num_groups = TagName.count)
  keywords = TagName.get_test_keywords(num_keywords_per_group)
  keywords_arrays = keywords

  disable_activerecord_sql_logging()

  puts "\nBenchmark for performing #{num_groups} queries of #{num_keywords_per_group} keyword(s) each:"
  puts "Sample query: #{keywords_arrays.first}", ""

  benchmark_block(keywords_arrays)

  enable_activerecord_sql_logging()
end

# Takes an optional argument of number of products to search for (default 1000).
# => Grabs the keyword arrays for n products and then times the queries for
# => each of the search methods.
def search_for_products(n = 1000)
  if n > Product.count
    puts puts "Number of products requested was greater than number of product records, using maximum number"
    n = Product.count
  end

  disable_activerecord_sql_logging()
  keywords_arrays = Product.all.pluck(:keywords_arr).shuffle.take(n)

  puts "\nBenchmark for performing search for #{n} products:"
  puts "Sample query: #{keywords_arrays.first}", ""

  benchmark_block(keywords_arrays)

  enable_activerecord_sql_logging()
end

# Takes one argument for number of products to seed (default 1).
# => Tests speed for inserting num_products new products.
# => Does not reflect seed speed, as seed utilizes a batch insertion proc.
def test_seed_speed(num_products = 1)
  puts "\nBenchmark for seeding #{num_products} products"

  disable_activerecord_sql_logging()

  Benchmark.bm do |x|
    x.report { num_products.times { seed_one_sleeping_bag() } }
  end

  enable_activerecord_sql_logging()
end
