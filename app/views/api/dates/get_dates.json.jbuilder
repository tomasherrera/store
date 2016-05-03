json.dates do 
  json.today I18n.localize Date.today, format: :complex
  json.yesterday I18n.localize Date.yesterday, format: :complex
  json.lastweek I18n.localize Date.today.advance(:days => -7), format: :complex
  json.lastmonth I18n.localize Date.today.advance(:months => -1), format: :complex
end