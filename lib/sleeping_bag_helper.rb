require_relative './common_features'

DOWN_SB_BRANDS = "Basin And Range
Big Agnes
Brooks-Range
Crux
Fjallraven
Haglöfs
Kammok
Kelty
Marmot
Millet
Mountain Equipment
Mountain Hardwear
NEMO Equipment Inc.
Rab
Sea To Summit
Sierra Designs
The North Face
Therm-A-Rest
Valandre
Vaude
Western Mountaineering
Yeti International".split("\n")

SYNTH_SB_BRANDS = "ALPS Mountaineering
Basin And Range
Big Agnes
Burton
Eureka
Fjallraven
Haglöfs
Kammok
Kelty
Mammut
Marmot
Millet
Mountain Equipment
Mountain Hardwear
Mountainsmith
NEMO Equipment Inc.
Poler
Rab
Sea To Summit
Selk'bag USA, Inc.
Sierra Designs
The North Face
Therm-A-Rest
Vaude".split("\n")

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
  keywords = [insulation_type, "Synthetic", "Sleeping", "Bag"]
  keywords.concat(["Mountaineering", "Expedition", "4-Season", "Waterproof", "Water-Resistant", "Gore-Tex"]) if temp <= 0
  keywords << ((rand() > 0.5) ? "Backpacking" : "Camping") if temp > 0
  keywords
end

SB_INSULATIONS = ["Coreloft", "Primaloft Infinity", "Polarguard Delta", "Stratofiber", "Thermaloft", "Heatseeker Pro", "Heatseeker Eco"]
SB_TEMPERATURES = [-40, -30, -20, -15, -10, 0, 5, 10, 15, 20, 25, 30, 35, 40]

def seed_one_sleeping_bag(&prc)
  prc ||= Proc.new { |params| Product.create_new_product(params) }

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

  extras = extra_keywords(options)

  keywords = [brand, model_name, temp.to_s, color, *extras]
  name = keywords.join(" ")
  keywords_hash = {}
  keywords.each { |kw| keywords_hash[kw] = true}

  params = {
    name: name,
    keywords_hs: keywords_hash,
    keywords_arr: name.downcase.split(" "),
    keywords_jsonb: keywords_hash
  }

  prc.call(params)
end


def seed_sleeping_bags(type = :down, &prc)
  prc ||= Proc.new { |params| Product.create_new_product(params) }
  brands = type == :down ? DOWN_SB_BRANDS : SYNTH_SB_BRANDS

  brands.each do |brand|
    # Generate 1-10 models for a brand
    rand(1..10).times do |model_num|
      model_name = random_model_name()

      # Generate 1-4 colors for the model
      colors = COLORS.shuffle.take(rand(1..4))

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
      extras = extra_keywords(options)

      temps.each do |temp|
        colors.each do |color|
          keywords = [brand, model_name, temp.to_s, color, *extras]
          name = keywords.join(" ")
          keywords_hash = {}
          keywords.each { |kw| keywords_hash[kw] = true}

          params = {
            name: name,
            keywords_hs: keywords_hash,
            keywords_arr: name.downcase.split(" "),
            keywords_jsonb: keywords_hash
          }

          prc.call(params)
        end
      end
    end
  end
end
