require 'rails_helper'

RSpec.describe 'dashboard' do
  context 'not logged in' do
    it {
      skip
    }
  end

  context 'logged in' do
    let(:current_user) { create(:user) }
    before {
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
    }

    it {
      binding.pry
    }
  end

  context 'no announcements' do
    it {
      binding.pry
    }
  end

  context 'some announcements' do
    let!(:announcement1) { create(:announcement) }
    let!(:announcement2) { create(:announcement, :with_description) }

    it {
      binding.pry
    }
  end

  context 'error on fetch' do
    before {
      allow_any_instance_of(Api::AnnouncementsController).to receive(:index).and_raise(StandardError.new('えらーーーーーーーーー'))
    }

    it {
      binding.pry
    }
  end
end
