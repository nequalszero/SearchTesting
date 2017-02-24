require_relative './product_helper'

# Suppress ActiveRecord SQL that is logged when using find_by_sql
def disable_activerecord_sql_logging
  ActiveRecord::Base.logger.level = 1
end

# Re-enable ActiveRecord SQL logging
def enable_activerecord_sql_logging
  ActiveRecord::Base.logger.level = 0
end

def test_search_methods(num_keywords_per_group = 1, num_groups = TagName.count)
  keywords = TagName.get_test_keywords(num_keywords_per_group)
  keywords_arrays = keywords

  disable_activerecord_sql_logging()

  puts "\nBenchmark for performing #{num_groups} queries of #{num_keywords_per_group} keyword(s) each:"
  puts "Sample query: #{keywords_arrays.first}", ""

  Benchmark.bmbm do |x|
    x.report("by relation:") { keywords_arrays.each { |kw_arr| Product.select_products_by_tags(*kw_arr) } }
    x.report("by jsonb:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_jsonb(kw_arr) }  }
    x.report("by hstore:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_hstore(kw_arr) }  }
    x.report("by array:")  { keywords_arrays.each { |kw_arr| Product.select_products_by_array(kw_arr) }  }
  end

  enable_activerecord_sql_logging()
end

def test_seed_speed(num_products = 1)
  puts "\nBenchmark for seeding #{num_products} products"

  disable_activerecord_sql_logging()

  Benchmark.bm do |x|
    x.report { num_products.times { seed_one_sleeping_bag() } }
  end

  enable_activerecord_sql_logging()
end
