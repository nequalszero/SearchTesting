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
REI
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
REI
Sea To Summit
Selk'bag USA, Inc.
Sierra Designs
The North Face
Therm-A-Rest
Vaude".split("\n")

ALL_BRANDS = [].concat(TENT_BRANDS_3S)
               .concat(TENT_BRANDS_4S)
               .concat(DOWN_SB_BRANDS)
               .concat(SYNTH_SB_BRANDS)
               .uniq
