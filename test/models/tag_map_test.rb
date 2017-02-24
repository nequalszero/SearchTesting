# == Schema Information
#
# Table name: tag_maps
#
#  id          :integer          not null, primary key
#  tag_name_id :integer          not null
#  product_ids :integer          default("{}"), not null, is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class TagMapTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
