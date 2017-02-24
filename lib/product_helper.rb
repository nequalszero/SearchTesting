require_relative './sleeping_bag_helper'
require_relative './common_features'
require 'faker'
require 'set'

def random_model_name
  # Faker::GameOfThrones.unique.city    # 36 options
  # Faker::GameOfThrones.unique.dragon  # 19 options
  # Faker::App.unique.name              # 82 options
  # Faker::Ancient.unique.god           # 14 options
  # Faker::Ancient.unique.hero          # 57 options
  # Faker::Ancient.unique.titan         # 33 options
  # Faker::Ancient.unique.primordial    # 20 options
  # Faker::Beer.unique.hop              # 51 options
  # Faker::Hacker.unique.abbreviation   # 29 options
  # Faker::Hacker.unique.noun           # 24 options
  # Faker::Lorem.unique.word            # many options

  lorem_proc = Proc.new {
    name = Faker::Lorem.word.capitalize
    until name.length > 4
      name = Faker::Lorem.word.capitalize
    end
    name
  }

  [
    Proc.new { Faker::GameOfThrones.city },
    Proc.new { Faker::GameOfThrones.city },
    Proc.new { Faker::GameOfThrones.dragon },
    Proc.new { Faker::App.name },
    Proc.new { Faker::App.name },
    Proc.new { Faker::App.name },
    Proc.new { Faker::App.name },
    Proc.new { Faker::Ancient.god },
    Proc.new { Faker::Ancient.hero },
    Proc.new { Faker::Ancient.hero },
    Proc.new { Faker::Ancient.hero },
    Proc.new { Faker::Ancient.titan },
    Proc.new { Faker::Ancient.titan },
    Proc.new { Faker::Ancient.primordial },
    Proc.new { Faker::Beer.hop },
    Proc.new { Faker::Beer.hop },
    Proc.new { Faker::Hacker.noun.capitalize_phrase },
    Proc.new { Faker::Hacker.abbreviation },
    lorem_proc,
    lorem_proc,
    lorem_proc,
    lorem_proc,
    lorem_proc
  ].sample.call
end

def extra_keywords(params)
  raise "Error missing params[:type]" unless params[:type]

  case params[:type]
  when :down_sb
    down_sb_adjectives(params[:fill_power], params[:temp])
  when :synthetic_sb
    synthetic_sb_adjectives(params[:temp], params[:insulation_type])
  else
    raise "Error missing params[:type]" unless params[:type]
  end

end

def batch_seed_sleeping_bags
  batches = {products: [], tag_names: [], tags: []}
  counts = {products: 0, tag_names: 0, tags: 0}
  batch_size = 1_000
  tag_ids = {}

  batch_proc = Proc.new { |params|
    batches[:products] << Product.new(params)
    counts[:products] += 1

    params[:keywords_arr].each do |kw|
      unless tag_ids.has_key?(kw)
        tag_ids[kw] = counts[:tag_names] += 1
        batches[:tag_names] << TagName.new(name: kw)
      end
      counts[:tags] += 1
      batches[:tags] << Tag.new( tag_name_id: tag_ids[kw], product_id: counts[:products] )
    end

    if counts[:tags] >= batch_size
      new_records = batches.map {|_, val| val.length}.inject { |accum, i| accum + i }
      puts "Inserting batch: #{new_records} records"
      Product.import batches[:products]
      TagName.import batches[:tag_names]
      Tag.import batches[:tags]
      counts[:tags] = 0
      batches[:products], batches[:tag_names], batches[:tags] = [], [], []
    end
  }

  seed_sleeping_bags(&batch_proc)
  seed_sleeping_bags(:synthetic, &batch_proc)

  new_records = batches.map {|_, val| val.length}.inject { |accum, i| accum + i }
  puts "Last batch: #{new_records} records"
  Product.import batches[:products]
  TagName.import batches[:tag_names]
  Tag.import batches[:tags]
end
