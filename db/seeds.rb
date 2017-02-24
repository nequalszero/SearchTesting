# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require_relative '../lib/product_helper'
require 'byebug'

# Faker::GameOfThrones.unique.city   # 36 options
# Faker::GameOfThrones.unique.dragon # 19 options
# Faker::App.unique.name             # 82 options
# Faker::Ancient.unique.god          # 14 options
# Faker::Ancient.unique.hero          # 57 options
# Faker::Ancient.unique.titan          # 33 options
# Faker::Ancient.unique.primordial     # 20 options
# Faker::Beer.unique.hop     # 51 options
# Faker::Hacker.unique.abbreviation     # 29 options
# Faker::Hacker.unique.noun     # 24 options

# Faker::Lorem.word     # many options

# Faker::Color.unique.color_name     # 31 options
#
# debugger
# puts "hi"

batch_seed_sleeping_bags()
