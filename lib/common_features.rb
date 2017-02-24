class String
  # Capitalizes all words in a string separated by spaces.
  def capitalize_phrase
    self.split(" ").map {|word| word.capitalize}.join(" ")
  end
end

def color_list
  # 31 colors in Faker gem
  colors = []
  31.times { colors << Faker::Color.unique.color_name.capitalize_phrase }
  colors.sort
end

COLORS = color_list
FILL_POWERS = [550, 600, 650, 700, 750, 800, 850, 900]
