# Determines the number of queries made and the type of benchmark conducted
def determine_file_contents(filename)
  case filename[0]
  when 'k'
    /kw_(?<keywords>\d+)_q_(?<queries>\d+)/ =~ filename
    return {keywords: keywords.to_i, queries: queries.to_i, type: :random_keyword_search}
  when 'p'
    /q_(?<queries>\d+)/ =~ filename
    return {queries: queries.to_i, type: :product_search}
  when 'r'
    /q_(?<queries>\d+)/ =~ filename
    return {queries: queries.to_i, type: :realistic_product_search}
  else
    raise "Invalid starting letter for file #{filename}"
  end
end

# Uses file information returned from determine_file_contents to populate the appropriate section
# => of the results hash that is to be written to JSON.
def prepare_and_select_result_section(results, file_info)
  case file_info[:type]
  when :realistic_product_search
    results[:realistic_product_search][:details] = {queries: file_info[:queries]}
    return results[:realistic_product_search][:benchmarks] = {};

  when :product_search
    results[:product_search][:details] = {queries: file_info[:queries]}
    return results[:product_search][:benchmarks] = {};

  when :random_keyword_search
    new_record = {
      details: {
        queries: file_info[:queries],
        keywords: file_info[:keywords]
      },
      benchmarks: {}
    }
    results[:random_keyword_search].append(new_record)
    return results[:random_keyword_search].last

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
    realistic_product_search: {},
    product_search: {},
    random_keyword_search: []
  }

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
        # puts "query_type: #{query_type}"
        results_section["#{query_type}"] = {
          user: user_time.to_f,
          system: system_time.to_f,
          total: total_time.to_f,
          real: real_time.to_f
        }
      end
    end
  end

  puts "\nWriting JSON to file"
  File.open("processed_data/results.js","w") do |f|
    f.write("const applicationData = ")
    f.write(JSON.pretty_generate(results))
    f.write(";\n\n")
    f.write("export default applicationData;")
  end
  puts "\nDone"
end
