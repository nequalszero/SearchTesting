require 'set'

def query_type_description(params)
  raise "Error in benchmark_log_parser.rb #query_type_description - params :queries key missing" unless params[:queries]

  case params[:type]
  when :random_keyword_search
    raise "Error in benchmark_log_parser.rb #query_type_description - params :keywords key missing" unless params[:keywords]

    return "The graph below shows the result of making #{params[:queries]} queries of #{params[:keywords]} keywords each. The keywords were randomly selected from the tag_names table."
  when :product_search
    return "The graph below shows the result of making #{params[:queries]} queries using the full keyword description of a random product."

  when :realistic_product_search
    return "The graph below shows the result of making #{params[:queries]} queries using commonly paired keywords."

  else
    raise "Error in benchmark_log_parser.rb #query_type_description - params :type key is missing/invalid"
  end
end

# Determines the number of queries made and the type of benchmark conducted
def determine_file_contents(filename)
  case filename[0]
  when 'k'
    /kw_(?<keywords>\d+)_q_(?<queries>\d+)/ =~ filename
    description = query_type_description({keywords: keywords, queries: queries, type: :random_keyword_search})
    return {keywords: keywords.to_i, queries: queries.to_i, type: :random_keyword_search, description: description}
  when 'p'
    /q_(?<queries>\d+)/ =~ filename
    description = query_type_description({queries: queries, type: :product_search})
    return {queries: queries.to_i, type: :product_search, description: description}
  when 'r'
    /q_(?<queries>\d+)/ =~ filename
    description = query_type_description({queries: queries, type: :realistic_product_search})
    return {queries: queries.to_i, type: :realistic_product_search, description: description}
  else
    raise "Invalid starting letter for file #{filename}"
  end
end

# Uses file information returned from determine_file_contents to populate the appropriate section
# => of the results hash that is to be written to JSON.
def prepare_and_select_result_section(results, file_info)
  case file_info[:type]
  when :realistic_product_search
    results[:data][:realistic_product_search][:details] = {queries: file_info[:queries], description: file_info[:description]}
    return results[:data][:realistic_product_search][:benchmarks] = [];

  when :product_search
    results[:data][:product_search][:details] = {queries: file_info[:queries], description: file_info[:description]}
    return results[:data][:product_search][:benchmarks] = [];

  when :random_keyword_search
    new_record = {
      details: {
        queries: file_info[:queries],
        keywords: file_info[:keywords],
        description: file_info[:description]
      },
      benchmarks: []
    }
    results[:data][:random_keyword_search].append(new_record)
    # return results[:data][:random_keyword_search].last
    return new_record[:benchmarks]

  else
    throw "Invalid file info type: #{file_info[:type]}"

  end
end

# Parses all files in the log/benchmarks directory and writes a JSON object to the processed_data folder
def parse_benchmark_log_files
  benchmark_dir = "log/benchmarks/"

  # Gets all the benchmark log files and ignores '.' and '..' directories
  file_names = Dir.entries(benchmark_dir)
                  .select {|entry| !File.directory?(entry) }
                  .map {|file| "#{benchmark_dir}#{file}" }

  # Results hash to be written to JSON. Note that random_keyword_search is an array.
  results = {
    query_keys: [],
    data: {
      realistic_product_search: {},
      product_search: {},
      random_keyword_search: []
    }
  }

  query_keys = Set.new

  # Process each of the benchmark log files
  file_names.each do |file|
    puts "\nprocessing #{file}"

    # Pass the file name (without the full path) to the determine_file_contents function
    file_info = determine_file_contents(file.slice(benchmark_dir.length, file.length))
    results_section = prepare_and_select_result_section(results, file_info)

    found_data_section = false

    File.open(file).each.with_index do |line, line_num|
      if (!found_data_section)
        # find the line with the user, system, total, and real time heading
        found_data_section = true if /user     system      total        real/ =~ line
      else
        # after the time heading has been found, parse all following lines
        /(?<query_type>.+):\s+(?<user_time>\d+\.\d+)\s+(?<system_time>\d+\.\d+)\s+(?<total_time>\d+\.\d+)\s+\(\s+(?<real_time>\d+\.\d+)\)/ =~ line
        puts "line: #{line}"

        results_section.push({
          query_key: query_type,
          user: user_time.to_f,
          system: system_time.to_f,
          total: total_time.to_f,
          real: real_time.to_f
        })
        query_keys.add(query_type)
      end
    end
  end

  results[:query_keys] = query_keys.to_a
  results
end

def create_results_file
  results = parse_benchmark_log_files()
  results[:database_information] = {
    counts: {
      products: Product.count,
      tag_names: TagName.count,
      tags: Tag.count
    }
  }

  puts "\nWriting JSON to file"
  File.open("processed_data/results.js","w") do |f|
    f.write("const applicationData = ")
    f.write(JSON.pretty_generate(results))
    f.write(";\n\n")
    f.write("export default applicationData;")
  end
  puts "\nDone"
end
