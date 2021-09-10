json.count @announcements.count
json.announcements @announcements do |announcement|
  json.id announcement.id
  json.title announcement.title
  json.description announcement.description
end
