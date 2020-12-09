--[===[
test AST

[Header 1 ("header-1",[],[]) [Str "Header",Space,Str "1"]
,Para [Str "paragraph",Space,Str "1.1"]
,Para [Str "paragraph",Space,Str "1.2"]
,Para [Str "paragraph",Space,Str "1.3"]
,OrderedList (1,Decimal,Period)
 [[Plain [Str "li",Space,Str "1"]]
 ,[Plain [Str "li",Space,Str "2"]]
 ,[Plain [Str "li",Space,Str "3"]]]
,Header 2 ("header-2",[],[]) [Str "Header",Space,Str "2"]
,Para [Str "paragraph",Space,Str "2.1"]
,Para [Str "paragraph",Space,Str "2.2"]
,Para [Str "paragraph",Space,Str "2.3"]]
--]===]

local elements = {
  h1 = 'Header 1',
  h2 = 'Header 2',
  p = 'Para',
  ol = 'OrderedList'
}

local metadata = {}
local collection = {}

-- helper function
local function forEach (table, callback)  
  for key,value in pairs(table) do
    callback(key, value)
  end
end

local function get_metadata (key, value) 
  if type(value) == 'table' and value.t == 'MetaInlines' then
    metadata[key] = table.unpack(value).text
  end
end

-- local function collectElements (metadata, blocks) 
--   forEach(metadata, function (k,v)
--     if ( elements.k == blocks.t ) then 
--       print( k, 'same as', blocks.content )
--     end
  -- end)
  -- if  selector:match '~' then
  --   for el in selector:gmatch '[%a%d]+' do
  --     print('selector:', el)
  --   end
  -- end
-- end


-- if sibling selector
-- make collection
-- apply class

function Meta (m)
  if m.target then
    forEach(m.target,  get_metadata)
  end 
end


function Block (b) 
    -- if it's a header
  forEach(metadata, function (k,v)
    if k:match('~') then
      print( metadata[k], 'sibling combinator' )
    end
    if (b.level) then
      t = {}
      table.insert(t, b.t)
      table.insert(t, b.level)
      t = table.concat(t, ' ')
      if ( elements[k] == t ) then
        for className in v:gmatch("([^.]+)") do
          table.insert( b.attr.classes, className )
        end
        forEach(b.classes, function (_,v) print(v) end)
      end
    end
  end)
  return b
end

-- Lua filter functions are run in the order
-- Inlines → Blocks → Meta → Pandoc.
-- Process Meta before Block
return { {Meta = Meta}, {Block = Block} }
