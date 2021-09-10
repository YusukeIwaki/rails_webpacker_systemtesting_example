class Api::AnnouncementsController < ApplicationController
  def index
    sleep 2.5
    @announcements = Announcement.last(5)
  end
end
