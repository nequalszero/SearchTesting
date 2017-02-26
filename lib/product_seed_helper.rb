require_relative './sleeping_bag_helper'
require_relative './tent_helper'
require_relative './common_features'

def batch_seed_sleeping_bags
  batches = {products: [], tag_names: [], tags: []}
  counts = {products: 0, tag_names: 0, tags: 0}
  batch_size = 1_000
  tag_ids = {}

  batch_proc = Proc.new { |keywords|
    keywords = keywords.map { |kw| kw.split(" ") }.flatten
    tag_name_ids, keywords_hash = [], {}

    keywords.each do |kw|
      counts[:tags] += 1
      kw = kw.downcase

      unless tag_ids.has_key?(kw)
        tag_ids[kw] = counts[:tag_names] += 1
        batches[:tag_names] << TagName.new(name: kw)
      end

      tag_name_ids << tag_ids[kw]
      keywords_hash[tag_ids[kw]] = true
      batches[:tags] << Tag.new( tag_name_id: tag_ids[kw], product_id: counts[:products] + 1 )
    end

    params = {
      name: keywords.join(" "),
      keywords_jsonb: keywords_hash,
      keywords_hs: keywords_hash,
      keywords_arr: tag_name_ids
    }

    batches[:products] << Product.new(params)
    counts[:products] += 1

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
  seed_tents(&batch_proc)
  seed_tents(4, &batch_proc)

  new_records = batches.map {|_, val| val.length}.inject { |accum, i| accum + i }
  puts "Last batch: #{new_records} records"
  Product.import batches[:products]
  TagName.import batches[:tag_names]
  Tag.import batches[:tags]
end
