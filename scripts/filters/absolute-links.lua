local function md_to_html (path)
  return string.gsub(path, "%.md$", ".html")
end

local function make_local_absolute (path)
  return string.gsub(path, "^%.-/-assets/img/", "/assets/img/")
end 

function Link (element)
  element.target = md_to_html (element.target)
  element.target = make_local_absolute(element.target)
  return element
end 

function Image (element)
  element.src = make_local_absolute(element.src)
  return element
end

-- TODO: add function for raw blocks? (e.g., video)
-- search for url or href, operate on string between quotes
-- function RawBlock (element)
  -- if element.format == 'html
  -- if element.value contains src or url
  -- if that src or url starts with ../
  -- run make_local_absolute
-- end
