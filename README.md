# Search Testing

This project tests the efficiency of searching a database for keywords/tags via traditional SQL relational tables versus NOSQL implementations doing sequential scans on a single table, examining array, hstore, and jsonb column data types.

The database is seeded with fake outdoor industry products, with most products having 10-20 tags. The activerecord-import gem is used for batch insertion to speed up the seeding process.

## Goal

* Compare the differences in search query times for Postgresql hstore, jsonb, and array column data types against multi-table relations.

## Setup

1.) Clone the project to your local machine.
2.) Make sure Postgres is running.
3.) Run `bundle install`
4.) Delete the username and password information in `config/database.yml`
5.) Run  `rake db:setup` to populate the database.  

## Usage
Enter the `rails console`. Load the benchmarking file by typing `load 'lib/product_benchmark.rb'`.  The two functions that perform benchmarking are `test_search_methods` and `search_for_products`.

### test_search_methods:
Takes an optional number of keywords per group (default 1) and optional number of groups (default TagName.count); performs num_groups queries of num_keywords_per_group for each search method.

### search_for_products:
Takes an optional argument of number of products to search for (default 1000).
Grabs the keyword arrays for n products and then times the queries for each of the search methods.


## Query Definitions
Queries are defined in `app/models/product.rb`.  New queries can be defined and easily added to the search methods being benchmarked by modifying the `benchmark_block` function in `lib/product_benchmark.rb`.

```
# == Schema Information
#
# These are extensions that must be enabled in order to support this database
# enable_extension "plpgsql"
# enable_extension "hstore"
#
# Table name: products
#
#  id              :integer      not null, primary key
#  name            :string       not null
#  keywords_hs     :hstore       not null
#  keywords_arr    :string       not null, array
#  keywords_jsonb  :jsonb        not null
#
# Table name: tag_names
#
#  id              :integer      not null, primary key
#  name            :string       not null, indexed
#
# Table name: tags
#  id              :integer      not null, primary key
#  tag_name_id     :integer      not null, foreign key, indexed
#  product_id      :integer      not null, foreign key, indexed
```
