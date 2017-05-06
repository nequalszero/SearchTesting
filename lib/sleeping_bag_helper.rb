require_relative './common_features'
require_relative './brands'

def down_sb_adjectives(fill_power, temp)
  keywords = [fill_power.to_s, "Fill", "Power", "Down", "Sleeping", "Bag"]
  keywords << "Ultralight" if fill_power >= 800
  keywords.concat(["Mountaineering", "Expedition", "Waterproof", "Water-Resistant", "Gore-Tex"]) if temp <= 0
  keywords << "Camping" if temp > 0 && fill_power <= 600
  keywords << "Backpacking" if temp > 0 && fill_power > 600
  keywords << "Water-Resistant" if temp > 0 && rand() > 0.5
  keywords
end

def synthetic_sb_adjectives(temp, insulation_type)
  keywords = [*insulation_type.split(" "), "Synthetic", "Sleeping", "Bag"]
  keywords.concat(["Mountaineering", "Expedition", "4-Season", "Waterproof", "Water-Resistant", "Gore-Tex"]) if temp <= 0
  keywords << ((rand() > 0.5) ? "Backpacking" : "Camping") if temp > 0
  keywords
end

FILL_POWERS = [550, 600, 650, 700, 750, 800, 850, 900]
SB_INSULATIONS = ["Coreloft", "Primaloft Infinity", "Polarguard Delta", "Stratofiber", "Thermaloft", "Heatseeker Pro", "Heatseeker Eco"]
SB_TEMPERATURES = [-40, -30, -20, -15, -10, 0, 5, 10, 15, 20, 25, 30, 35, 40]
SB_KEYWORDS = []
SB_KEYWORDS.concat( SB_TEMPERATURES.map { |temp| "#{temp} down"} )
SB_KEYWORDS.concat( SB_TEMPERATURES.map { |temp| "#{temp} synthetic"} )
SB_KEYWORDS.concat( SB_INSULATIONS.map { |i| "#{i} synthetic"} )
SB_KEYWORDS.concat(FILL_POWERS.map { |fp| "#{fp} fill power down" } )
SB_KEYWORDS.concat([
  "down", "synthetic", "waterproof down", "waterproof synthetic", "expedition",
  "montaineering", "4-season", "gore-tex", "water-resistant", "backpacking", "camping",
  "ultralight", "ultralight down", "down backpacking", "synthetic backpacking",
  "ultralight backpacking", "ultralight down expedition"
])

def extra_sleeping_bag_keywords(params)
  raise "sleeping_bag_helper#extra_sleeping_bag_keywords - Error missing params[:type]" unless params[:type]

  case params[:type]
  when :down_sb
    down_sb_adjectives(params[:fill_power], params[:temp])
  when :synthetic_sb
    synthetic_sb_adjectives(params[:temp], params[:insulation_type])
  else
    raise "Error missing params[:type]" unless params[:type]
  end
end

def seed_one_sleeping_bag(&prc)
  prc ||= Proc.new { |keywords| Product.create_new_product(keywords) }

  type = rand() > 0.5 ? :down : :synthetic
  brand = type == :down ? DOWN_SB_BRANDS.sample : SYNTH_SB_BRANDS.sample
  model_name = random_model_name()
  color = COLORS.sample
  temp = SB_TEMPERATURES.sample
  fill_power = FILL_POWERS.sample if type == :down
  insulation_type = SB_INSULATIONS.sample if type == :synthetic

  options = {
    type: type == :down ? :down_sb : :synthetic_sb,
    temp: temp
  }
  options[:fill_power] = fill_power if type == :down
  options[:insulation_type] = insulation_type if type == :synthetic

  extras = extra_sleeping_bag_keywords(options)

  prc.call([brand, model_name, temp.to_s, color, *extras])
end


def seed_sleeping_bags(type = :down, &prc)
  prc ||= Proc.new { |keywords| Product.create_new_product(keywords) }
  brands = type == :down ? DOWN_SB_BRANDS : SYNTH_SB_BRANDS
  puts "\nSeeding #{type} sleeping bags."

  brands.each do |brand|
    # Generate 1-10 models for a brand
    rand(1..10).times do |model_num|
      model_name = random_model_name()

      # Generate 1-4 colors for the model
      colors = pick_colors(rand(1..4))

      # Create 1-3 temperature ratings for the model
      temps = [SB_TEMPERATURES.sample]
      inc = rand(5..10)
      temps.concat( rand() >= 0.5 ? [temps.first + inc, temps.first - inc] : [] )

      # Select fill power for the model
      fill_power = FILL_POWERS.sample if type == :down
      insulation_type = SB_INSULATIONS.sample if type == :synthetic

      options = {
        type: type == :down ? :down_sb : :synthetic_sb,
        temp: temps.first
      }
      options[:fill_power] = fill_power if type == :down
      options[:insulation_type] = insulation_type if type == :synthetic
      extras = extra_sleeping_bag_keywords(options)

      temps.each do |temp|
        colors.each do |color|
          prc.call([brand, model_name, temp.to_s, color, *extras])
        end
      end
    end
  end
end
