local function convert_MD_links (path)
  return string.gsub(path, "%.md", ".html")
end

local function make_path_absolute (path)
  return string.gsub(path, "^%.-/-img/", "/img/")
end 

function Link (element)
  element.target = convert_MD_links(element.target)
  element.target = make_path_absolute(element.target)
  return element
end 

function Image (element)
  element.src = make_path_absolute(element.src)
  return element
end
