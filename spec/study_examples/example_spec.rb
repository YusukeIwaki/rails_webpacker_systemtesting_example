require 'rails_helper'

describe 'Dashboard' do
  context 'with some announcements' do
    let!(:announcement1) { create(:announcement) }
    let!(:announcement2) { create(:announcement, :with_description) }

    it {
      binding.pry
    }
  end
end
