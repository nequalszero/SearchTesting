require_relative './product_seed_helper'
require_relative './sleeping_bag_helper'
require_relative './tent_helper'
require 'pp'

# Suppress ActiveRecord SQL that is logged when using find_by_sql
def disable_activerecord_sql_logging
  ActiveRecord::Base.logger.level = 1
end

# Re-enable ActiveRecord SQL logging
def enable_activerecord_sql_logging
  ActiveRecord::Base.logger.level = 0
end

# Accepts an array of arrays, where each of the nested arrays are filled with strings
def benchmark_block(keywords_arrays)
  Benchmark.bmbm do |x|
    x.report("relation w/ 2 joins:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags(*kw_arr) } }
    x.report("relation w/ 3 queries:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags_v2(*kw_arr) } }
    x.report("relation w/ 2 subq:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags_v3(*kw_arr) } }
    x.report("relation w/ 1 subq, 2 joins:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags_with_subqueries(*kw_arr) } }
    x.report("jsonb w/ 1 subq:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_jsonb_v2(kw_arr) }  }
    x.report("array w/ 1 subq:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_array_v2(kw_arr) }  }
    x.report("hstore w/ 1 subq:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_hstore_v2(kw_arr) }  }
    x.report("jsonb w/ 2 queries:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_jsonb(kw_arr) }  }
    x.report("hstore w/ 2 queries:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_hstore(kw_arr) }  }
    x.report("array w/ 2 queries:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_array(kw_arr) }  }
  end
end

# Takes an optional number of keywords per group (default 1) and optional number of groups (default TagName.count)
# => Performs num_groups queries of num_keywords_per_group for each search method.
def test_search_methods(num_keywords_per_group = 1, num_groups = TagName.count)
  keywords = TagName.get_test_keywords(num_keywords_per_group)
  keywords_arrays = keywords

  disable_activerecord_sql_logging()

  puts "Runnings benchmarks and writing results to log/benchmarks directory"
  $stdout = File.new("log/benchmarks/kw_#{num_keywords_per_group}_q_#{num_groups}.log", 'w')
  $stdout.sync = true

  puts "\nBenchmark for performing #{num_groups} queries of #{num_keywords_per_group} keyword(s) each:"
  puts "Sample query: #{keywords_arrays.first}", ""

  benchmark_block(keywords_arrays)

  $stdout = STDOUT
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
  keywords_arrays = Product.all.pluck(:name).shuffle.take(n)
  keywords_arrays = keywords_arrays.map { |name| name.split(" ").map(&:downcase) }

  puts "Runnings benchmarks and writing results to log/benchmarks directory"
  $stdout = File.new("log/benchmarks/ps_q_#{n}.log", 'w')
  $stdout.sync = true

  puts "\nBenchmark for performing search for #{n} products:"
  puts "Sample query: #{keywords_arrays.first}", ""

  benchmark_block(keywords_arrays)

  $stdout = STDOUT
  enable_activerecord_sql_logging()
end

# Takes an optional argument of number of queires to perform (default 1000).
# => Grabs the keywords for n products, selects at least 5 keywords from each product,
# =>  and then times the queries for each of the search methods.
def search_for_products_modified(n = 1000)
  if n > Product.count
    puts puts "Number of queries requested was greater than number of product records, using maximum number"
    n = Product.count
  end

  disable_activerecord_sql_logging()
  keywords_arrays = ALL_BRANDS.map { |brand| brand.split(" ") }
  keywords_arrays = Product.all.pluck(:name).shuffle.take(n).map { |name| name.downcase.split(" ") }
  keywords_arrays = keywords_arrays.map { |kw_arr| kw_arr.take(rand(5..kw_arr.length)) }

  puts "\nBenchmark for performing #{n} queries:"
  puts "Sample query: #{keywords_arrays.first}", ""

  benchmark_block(keywords_arrays)

  enable_activerecord_sql_logging()
end

# Simulates a large number of realistic keyword searches
def realistic_product_search(limit_1000 = true)
  keywords_arrays = []
  brands = ALL_BRANDS.map { |brand| brand.downcase.split(" ") }

  SB_KEYWORDS.shuffle.each do |phrase|
    keywords_arrays << query = [*phrase.split(" "), "sleeping", "bag"]
    brands.each { |brand| keywords_arrays << [*brand, *query] }
  end
  TENT_KEYWORDS.shuffle.each do |phrase|
    keywords_arrays << query = [*phrase.split(" "), "tent"]
    brands.each { |brand| keywords_arrays << [*brand, *query] }
  end

  keywords_arrays = keywords_arrays.shuffle.take(1000) if limit_1000

  distribution = Hash.new(0)
  keywords_arrays.each { |kw_arr| distribution[kw_arr.length] += 1 }

  disable_activerecord_sql_logging()

  puts "Runnings benchmarks and writing results to log/benchmarks directory"
  $stdout = File.new("log/benchmarks/rps_q_#{keywords_arrays.length}.log", 'w')
  $stdout.sync = true

  puts "\nBenchmark for performing #{keywords_arrays.length} queries:"
  puts "\nKeyword count distribution: "
  distribution.keys.sort.each { |num_kws| puts "\t#{num_kws} keywords: #{distribution[num_kws]} queries"}
  puts "Sample query: #{keywords_arrays.first}", ""

  benchmark_block(keywords_arrays)

  $stdout = STDOUT
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
