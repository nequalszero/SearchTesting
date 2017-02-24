# == Schema Information
#
# Table name: products
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  keywords_hs    :hstore           not null
#  keywords_arr   :string           default("{}"), not null, is an Array
#  keywords_jsonb :jsonb            default("{}"), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
