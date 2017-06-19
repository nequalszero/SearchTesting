# Search Testing

Live Demo: https://nequalszero.github.io/SearchTesting

This project tests the efficiency of searching a database for keywords/tags via traditional SQL relational tables versus NOSQL implementations doing sequential scans on a single table, examining array, hstore, and jsonb column data types.

The database is seeded with fake outdoor industry products, with most products having 10-20 tags. The activerecord-import gem is used for batch insertion to speed up the seeding process.

Note that the back end is completely separate from the front end in this project, and there are no Rails controllers.

Additional details to be added for recent React/D3 integration.

## Goal

Compare the differences in search query times for Postgresql hstore, jsonb, and array column data types against multi-table relations.

## Setup

1. Clone the project to your local machine.
2. Make sure Postgres is running.
3. Run `bundle install`
4. Delete the username and password information in `config/database.yml`.
5. Run  `rake db:setup` to configure and populate the database.  
6. Run `npm install` to install the node modules.
7. Follow directions below in `Backend Usage Information` section for notes on running benchmarks and updating the data accessed by the front end.
8. Useful commands to run for developing the front end are:
  * `npm start`, which fires up the `webpack-dev-server` and essentially listens for changes to `.js` and `.css` files.
  * `npm run build:sass -- -w`, which recompiles `SCSS` files found in `frontend/styles/` to `CSS` files on save.


## Backend Usage Information
Enter the `rails console`. Load the benchmarking file by typing `load 'lib/product_benchmark.rb'`.  The functions that perform benchmarking are `test_search_methods`, `search_for_products`, and `realistic_product_search`.

Each function logs it output to files that can be found in `lib/benchmarks`. The files are named following some abbreviations (`q` for number of queries, `kw` for number of keywords, `ps` for product search, and `rps` for realistic product search) that are used in parsing the log files.

The log files can be parsed by typing `load 'lib/benchmark_log_parser.rb'` followed by calling `create_results_file`. This will parse the log files into a JavaScript object that can be found in `processed_data/results.js`.

## Benchmark Function Descriptions
### test_search_methods(num_keywords_per_group = 1, num_groups = TagName.count):
Takes an optional number of keywords per group (default 1) and optional number of groups (default TagName.count); performs num_groups queries of num_keywords_per_group for each search method.

### search_for_products(n = 1000):
Takes an optional argument of number of products to search for (default 1000).
Grabs the keyword arrays for n products and then times the queries for each of the search methods.

### realistic_product_search(limit_1000 = true):
Takes an optional argument to limit the number of queries to 1000.  Queries the database using common realistic search phrases of varying numbers of keywords.  If the optional argument is omitted, will perform several thousand queries and take a while.

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
