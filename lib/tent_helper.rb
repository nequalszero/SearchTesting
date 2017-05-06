require_relative './common_features'
require_relative './brands'

MAX_NUM_DOORS = {
  1 => 1,
  2 => 2,
  3 => 2,
  4 => 2,
  5 => 3,
  6 => 3
}

TENT_KEYWORDS = [
  "3-season", "4-season", "camping", "backpacking", "semi-freestanding",
  "non-freestanding", "freestanding", "single-wall", "double-wall",
  "fast-pitch option", "ultralight", "mountaineering", "inflateable-poles",
  "expedition", "ultralight 3-season", "ultralight 4-season", "ultralight backpacking",
  "ultralight mountaineering", "fast-pitch option backpacking", "single-wall backpacking",
  "single-wall expedition", "single-wall mountaineering", "ultralight single-wall",
  "double-wall backpacking", "double-wall mountaineering", "double-wall expedition",
  "ultralight double-wall", "footprint-included", "camping footprint-included",
  "backpacking footprint-included", "inflateable-poles", "3-season single-wall",
  "3-season single-wall fast-pitch option", "3-season single-wall ultralight",
  "3-season single-wall fast-pitch option ultralight", "4-season single-wall",
  "4-season single-wall fast-pitch option", "4-season single-wall ultralight",
  "4-season single-wall fast-pitch option ultralight", "3-season double-wall",
  "3-season double-wall fast-pitch option", "3-season double-wall ultralight",
  "3-season double-wall fast-pitch option ultralight", "4-season double-wall",
  "4-season double-wall fast-pitch option", "4-season double-wall ultralight",
  "4-season double-wall fast-pitch option ultralight",
]

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
  prc ||= Proc.new { |keywords| Product.create_new_product(keywords) }

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
  prc.call([brand, model_name, capacity.to_s, "#{seasons}-season", "#{num_doors}-door", color, *extras])
end

def seed_tents(seasons = 3, &prc)
  prc ||= Proc.new { |keywords| Product.create_new_product(keywords) }
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
          prc.call([brand, model_name, capacity.to_s, "#{seasons}-season", "#{num_doors}-door", color, *extras])
        end
      end
    end
  end
end
