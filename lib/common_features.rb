require 'faker'

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

def pick_colors(num_colors)
  colors = []
  until colors.length == num_colors
    color = COLORS.sample
    colors << COLORS.sample unless colors.include?(color)
  end
  colors
end

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
