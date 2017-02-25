require_relative './common_features'

TENT_BRANDS_3S = "ALPS Mountaineering
Alite Designs
Basin And Range
Big Agnes
Black Diamond
Brooks-Range
Burton
Eureka
Exped
Heimplanet
Jack Wolfskin
Kelty
MSR
Marmot
Mountain Hardwear
Mountainsmith
NEMO Equipment Inc.
Paha Que
Poler
REI
Sea To Summit
Sierra Designs
Tentsile
Tepui
Terra Nova
The North Face
Vaude".split("\n")

TENT_BRANDS_4S = "ALPS Mountaineering
Big Agnes
Black Diamond
Brooks-Range
Eureka
Exped
MSR
Marmot
Mountain Hardwear
NEMO Equipment Inc.
Rab
Terra Nova
The North Face".split("\n")

MAX_NUM_DOORS = {
  1 => 1,
  2 => 2,
  3 => 2,
  4 => 2,
  5 => 3,
  6 => 3
}

require 'byebug'

def extra_tent_keywords(options)
  keywords = []

  case options[:seasons]
  when 3
    keywords = ["3-season", "Tent"]
    keywords << (rand() > 0.7 ? "Camping" : "Backpacking")
    keywords << (rand() > 0.6 ? "Semi-freestanding" : (rand() > 0.8 ? "Non-freestanding" : "Freestanding") )
    keywords.concat( (rand() > 0.8 ? ["Footprint-included"] : []) )
    keywords.concat( (rand() > 0.7 ? ["Fast-Pitch Option", "Ultralight"] : []) )
    keywords.concat( (keywords.last == "Ultralight" ? (rand() > 0.25 ? ["Single-wall"] : []) : []) )
    keywords << "Double-wall" unless keywords.last == "Single-wall"
    keywords << "Inflatable-poles" if options[:brand] == 'Heimplanet'
  when 4
    keywords << ["4-season", "Backpacking", "Mountaineering", "Expedition", "Tent", "Freestanding"]
    keywords.concat( (rand() > 0.7 ? ["Ultralight", "Single-wall"] : ["Double-wall"]) )
  else
    raise "ERROR in tent_helper#get_tent_type - no case for #{seasons} seasons"
  end
  keywords
end

def add_additional_capacities(starting_capacity)
  extras = []

  case starting_capacity
  when 1
    extras.concat ( rand() > 0.7 ? [2] : [] )
  when 2
    if rand() > 0.7
      inc = rand(1..2)
      extras << 2 + inc
      extras.concat( (rand() > 0.7 ? [(2 + 2*inc)] : []) )
    end
  when 3
    extras.concat ( rand() > 0.7 ? [2] : [] )
    extras.concat ( rand() > 0.7 ? [6] : [] )
  end

  extras
end

def seed_one_tent(&prc)
  prc ||= Proc.new { |params| Product.create_new_pCOLORS.shuffle.takeroduct(params) }

  seasons = rand() > 0.8 ? 4 : 3
  brand = seasons == 3 ? TENT_BRANDS_3S.sample : TENT_BRANDS_4S.sample
  model_name = random_model_name()
  color = COLORS.sample
  capacity = rand(1..6)
  num_doors = rand(1..MAX_NUM_DOORS[capacity])

  options = {
    seasons: seasons,
    brand: brand
  }

  extras = extra_tent_keywords(options)
  params = create_product_params([brand, model_name, capacity.to_s, "#{seasons}-season", "#{num_doors}-door", color, *extras])
  prc.call(params)
end

def seed_tents(seasons = 3, &prc)
  prc ||= Proc.new { |params| Product.create_new_product(params) }
  puts "\nSeeding #{seasons}-season tents."
  brands = seasons == 3 ? TENT_BRANDS_3S : TENT_BRANDS_4S

  brands.each do |brand|
    # Generate 1-10 models for a brand
    rand(1..10).times do |model_num|
      model_name = random_model_name()

      # Generate 1-4 colors for the model
      colors = pick_colors(rand(1..4))

      capacities = [rand(1..6)]
      capacities.concat(add_additional_capacities(capacities.first))

      options = {
        seasons: seasons,
        brand: brand
      }

      extras = extra_tent_keywords(options)

      capacities.each do |capacity|
        num_doors = rand(1..MAX_NUM_DOORS[capacity])
        colors.each do |color|
          params = create_product_params([brand, model_name, capacity.to_s, "#{seasons}-season", "#{num_doors}-door", color, *extras])
          prc.call(params)
        end
      end
    end
  end
end
